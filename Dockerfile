FROM tyforge_php56
MAINTAINER Moda (moda@ac-rennes.fr)

ARG ARG_PARAM_INSTALL
ARG ARG_PARAM_SVN_INSTALLERS

USER root

# Récupération de l'installer TyForge et installation de sonarjenkins en mode automatique (-y)
RUN cd /tmp/ && rm -Rf ty-installers \
	&& svn export  --non-interactive --username seriaexploit --password exploitu2% http://subversion.tyforge.in.ac-rennes.fr/ty-installers/${ARG_PARAM_SVN_INSTALLERS}/ ty-installers \ 
	&& cd ty-installers \
	&& ./install_bundle.sh ${ARG_PARAM_INSTALL} -y

WORKDIR /opt/portail