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


check_user

if [[ ${INIT} -ne 0 ]];then
	# database init
	/etc/init.d/postgresql-9.3 start
	
	dropdb -U postgres --if-exists portail
	dropuser -U postgres --if-exists portail
	echo "Database : Creation de l'utilisateur portail"
	createuser -U postgres -S -D -R -i -l -P portail
	createdb -U postgres -O portail portail
	psql -U postgres -f script/portail.sql
fi








