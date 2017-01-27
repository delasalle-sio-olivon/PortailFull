#!/bin/bash
#
# Copyright 2010, Capgemini
# Authors:  Antoine Mercadal - capgemini
#           Franck Villaume - capgemini
#           Jean-Michel Maisonnave - capgemini
#
# This file is part of ActivForge.
#
# ActivForge is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# ActivForge is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with FusionForge; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307 USA

# set -x

not_root() {
    echo "script a executer en tant que root"
    exit 1
}

usage() {
    echo "$0 -p <dev|integ|prod|prep|form> -c <TyForge|sirhen|fablab> [-i]"
    exit 1
}

check_gforge_user() {
    GFORGE_UID=`id -u gforge`
    GFORGE_GID=`id -g gforge`
    if [[ ! $GFORGE_UID -eq 500 ]]; then
        echo "l'utilisateur gforge n'existe pas ou n'a pas l'uid 500: $GFORGE_UID"
        exit 1
    fi

    if [[ ! $GFORGE_GID -eq 500 ]]; then
        echo "l'utilisateur gforge n'existe pas ou n'a pas le gid 500: $GFORGE_GID"
        exit 1
    fi
}

run() {
    $1;
    RET=$?
    if [[ ! $RET -eq $2 ]]; then
        echo "$1: Erreur dans la commande. Code de sortie: Attendu: $2, Reel :$RET"
        exit 1
    fi
}
	
if [[ 0 != `id -u` ]]; then
    not_root
fi

if [[ $# -eq 0 ]]; then
    usage
fi

INIT=0
# options e &m must be implemented even if not used
while getopts "e:m:p:c:g:i" OPTION
do
    case $OPTION in
        p)  PLATEFORME=$OPTARG
            if [[ "${PLATEFORME}" != "dev" && "${PLATEFORME}" != "integ" && "${PLATEFORME}" != "prod" && "${PLATEFORME}" != "prep" && "${PLATEFORME}" != "form" ]]; then
              usage
            fi
        ;;

        c)  CLIENT=$OPTARG
            if [[ "${CLIENT}" != "TyForge" && "${CLIENT}" != "sirhen" && "${CLIENT}" != "fablab" ]]; then
              usage
            fi
        ;;

        e|m)
        ;;

        i)  INIT=1
        ;;

        g)
            if [[ -z $TYPE_ARCHI ]];then
                TYPE_ARCHI=$OPTARG
            else
                echo "option -g unique"
                usage
            fi
        ;;

        *)  usage
        ;;
    esac
done

if [[ -z ${PLATEFORME} || -z ${CLIENT} ]];then
    usage
fi


run "rm -f /etc/apache2/conf-enabled/vhost_portailapp.conf" 0
run "ln -fs /opt/portail/etc/httpd/conf.d/${CLIENT}/${PLATEFORME}_vhost_portailapp.conf /etc/apache2/conf-enabled/vhost_portailapp.conf" 0

#Initaialisation des dépendances de Lumen via composer
run "cd /opt/portail/" 0
run "composer install" 0

#Répertoire de log 
run "rm -f /opt/portail/storage/logs" 0
run "ln -fs /var/log/apache2/ /opt/portail/storage/logs" 0


#Angular
run "cd /opt/portail/resources/views/front" 0
run "npm install"
#FIXME
#chmod 745 node_module/.bin #donner les droits d'execution au script npm 
#npm tsc #---> compilation ne fonctionne pas (npm start marche sinon mais reste active)
