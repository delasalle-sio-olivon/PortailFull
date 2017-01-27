
--
-- Base de données :  portail
--

-- --------------------------------------------------------

--
-- Structure de la table categories
--

CREATE TABLE categories (
  id serial  NOT NULL,
  unix varchar(255)  NOT NULL,
  titre varchar(255)  NOT NULL,
  resume varchar(255)  NOT NULL,
  detail varchar(255)  NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
) ;

--
-- Contenu de la table categories
--

INSERT INTO categories (id, unix, titre, resume, detail, created_at, updated_at) VALUES
(2, 'firstoffirst', 'Racine du portail', 'Cette catégorie est le conteneur parent, le portail n''affiche que ses enfants.', '', '2016-10-27 11:00:51', '2016-11-17 08:59:05'),
(84, 'qualite_et_securite_du_code_source', 'Qualité et Sécurité du code source', 'Qualité et Sécurité du code source', 'Qualité et Sécurité du code source', '2016-11-18 12:54:40', '2016-11-18 12:54:40'),
(82, 'IPDD', 'Installation, Packaging, Diffusion et Distribution', 'Installation, Packaging, Diffusion et Distribution', 'Installation, Packaging, Diffusion et Distribution', '2016-11-18 12:52:51', '2016-11-18 12:52:51'),
(79, 'ide', 'IDE', 'ide', 'ide', '2016-11-18 12:50:30', '2016-11-18 12:50:30'),
(80, 'gestion_des_anomalies', 'Gestion des anomalies', 'Gestion des anomalies', 'Gestion des anomalies', '2016-11-18 12:51:10', '2016-11-18 12:51:10'),
(81, 'gestion_du_code_source', 'Gestion du code source', 'Gestion du code source', 'Gestion du code source', '2016-11-18 12:51:40', '2016-11-18 12:51:40'),
(85, 'test_integration', 'Test et Intégration', 'Test et Intégration', 'Test et Intégration', '2016-11-18 13:12:16', '2016-11-21 10:05:12'),
(83, 'analyse_modelisation_patrimoine', 'Outils d''analyse, de Modélisation et de gestion de Patrimoine', 'Outils d''analyse, de Modélisation et de gestion de Patrimoine', 'Outils d''analyse, de Modélisation\net de gestion de Patrimoine', '2016-11-18 12:53:43', '2016-11-21 08:51:24'),
(65, 'catalogue_des_composants', 'Catalogue des composants', 'Catalogue des composants', 'Catalogue des composants', '2016-11-18 12:10:19', '2016-11-18 13:12:56'),
(86, 'outil_collaboratif', 'Outil Collaboratif', 'Outil Collaboratif', 'Outil Collaboratif', '2016-11-18 13:13:36', '2016-11-18 13:13:36'),
(87, 'bd_relationnelles', 'BD Relationnelles', 'BD Relationnelles', 'BD Relationnelles', '2016-11-18 13:16:05', '2016-11-18 13:16:05'),
(88, 'bd_non_relationnelles', 'Gestionnaire de données non relationnelles', 'Gestionnaire de données non relationnelles', 'Gestionnaire de données\nnon relationnelles', '2016-11-18 13:18:10', '2016-11-18 13:18:10'),
(89, 'portail_decisionnel', 'Portail décisionnel', 'Portail décisionnel', 'Portail décisionnel', '2016-11-18 13:22:38', '2016-11-18 13:22:38'),
(90, 'moteur_de_recherche', 'Moteur de recherche', 'Moteur de recherche', 'Moteur de recherche', '2016-11-18 13:33:11', '2016-11-18 13:33:11'),
(91, 'authentification', 'Authentification', 'Authentification', 'Authentification', '2016-11-18 13:34:20', '2016-11-18 13:34:20');

-- --------------------------------------------------------

--
-- Structure de la table 'categories_parents'
--

CREATE TABLE categories_parents (
  idParent serial NOT NULL,
  idEnfant int4 NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
) ;

--
-- Contenu de la table 'categories_parents'
--

INSERT INTO categories_parents (idParent, idEnfant, created_at, updated_at) VALUES
(65, 81, NULL, NULL),
(65, 83, NULL, NULL),
(65, 80, NULL, NULL),
(65, 79, NULL, NULL),
(65, 82, NULL, NULL),
(65, 84, NULL, NULL),
(2, 65, NULL, NULL),
(65, 85, NULL, NULL),
(65, 86, NULL, NULL),
(65, 87, NULL, NULL),
(65, 88, NULL, NULL),
(65, 89, NULL, NULL),
(65, 90, NULL, NULL),
(65, 91, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table 'informations'
--

CREATE TABLE informations (
  id serial  NOT NULL,
  unix varchar(255)  NOT NULL,
  titre varchar(255)  NOT NULL,
  resume varchar(255)  NOT NULL,
  detail varchar(255)  NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
) ;

--
-- Contenu de la table informations
--

INSERT INTO informations (id, unix, titre, resume, detail, created_at, updated_at) VALUES
(41, 'maven', 'Maven', 'Outil de gestion des dépendances entre les différents composants d''un projet et cycle de vie', 'Outil de gestion des dépendances entre les différents composants d''un projet et cycle de vie', '2016-11-18 13:43:14', '2016-11-18 13:43:14'),
(40, 'nexus', 'Nexus', 'Dépôt d''artefacts', 'Dépôt d''artefacts', '2016-11-18 13:43:14', '2016-11-18 13:43:14'),
(39, 'git', 'GIT', 'Outil de gestion des configurations (serveur)', 'Outil de gestion des configurations (serveur)', '2016-11-18 13:41:30', '2016-11-25 12:22:19'),
(37, 'mantis_bt', 'Mantis BT', 'Outil de remontée de bug', 'Outil de remontée de bug', '2016-11-18 13:39:52', '2016-11-18 13:39:52'),
(38, 'svn', 'SVN', 'Outil de gestion des configurations (serveur)', 'Outil de gestion des configurations (serveur)', '2016-11-18 13:41:30', '2016-11-25 12:22:19'),
(36, 'eclipse', 'Eclipse', 'Environnement de développement', 'Environnement de développement', '2016-11-18 13:39:11', '2016-11-18 13:39:11'),
(35, 'acceleo', 'Acceleo', 'Outil et/ou plugin de génération de tout ou partie du code', 'Outil et/ou plugin de génération de tout ou partie du code', '2016-11-18 13:38:05', '2016-11-18 13:38:05'),
(42, 'pencil', 'Pencil', 'Outil de maquettage IHM', 'Outil de maquettage IHM', '2016-11-18 13:44:19', '2016-11-18 13:44:19'),
(43, 'sonar_qube', 'SonarQube', 'Tableau de bord d''indicateurs de qualité', 'Tableau de bord d''indicateurs de qualité', '2016-11-18 13:46:00', '2016-11-18 13:46:00'),
(44, 'findbugs', 'FINDBUGS', 'Outil de détection de mauvaises pratiques	', 'Outil de détection de mauvaises pratiques	', '2016-11-18 13:47:35', '2016-11-18 13:47:35'),
(45, 'checkstyle', 'CHECKSTYLE', 'Outil de détection de mauvaises pratiques', 'Outil de détection de mauvaises pratiques', '2016-11-18 13:50:42', '2016-11-18 13:50:42'),
(46, 'pmd', 'PMD', 'Outil de détection de mauvaises pratiques', 'Outil de détection de mauvaises pratiques', '2016-11-18 13:51:49', '2016-11-18 13:51:49'),
(61, 'jenkins', 'JENKINS', 'Outil d''aide à la livraison (dépôt, intégration continue, ...)', 'Outil d''aide à la livraison (dépôt, intégration continue, ...)', '2016-11-18 15:01:37', '2016-11-18 15:01:37'),
(48, 'cobertura', 'Cobertura', 'Couverture de code', 'Couverture de code', '2016-11-18 13:54:56', '2016-11-18 13:54:56'),
(49, 'junit', 'Junit', 'Outil de gestion des tests unitaires', 'Outil de gestion des tests unitaires', '2016-11-18 13:55:30', '2016-11-18 13:55:30'),
(50, 'fitnesse', 'Fitnesse', 'Outil d''injection afin de tester les couches basses', 'Outil d''injection afin de tester les couches basses', '2016-11-18 13:56:06', '2016-11-18 13:56:06'),
(58, 'jacoco', 'Jacoco', 'Couverture de code', 'Couverture de code', '2016-11-18 14:58:46', '2016-11-18 14:58:46'),
(59, 'jmeter', 'JMeter', 'Robots de test / Injecteurs', 'Robots de test / Injecteurs', '2016-11-18 14:59:36', '2016-11-18 14:59:36'),
(60, 'soap_ui', 'SOAP UI', 'Outil d''aide aux tests techniques (web service)', 'Outil d''aide aux tests techniques (web service)', '2016-11-18 15:01:08', '2016-11-18 15:01:08'),
(62, 'selenium', 'Selenium', 'Automatisation des tests Web', 'Automatisation des tests Web', '2016-11-18 15:02:11', '2016-11-18 15:02:11'),
(63, 'testlink', 'TestLink', 'Gestion des campagnes de tests', 'Gestion des campagnes de tests', '2016-11-18 15:02:40', '2016-11-18 15:02:40'),
(64, 'squash_tm', 'Squash TM', 'Gestion des campagnes de tests', 'Gestion des campagnes de tests', '2016-11-18 15:03:21', '2016-11-18 15:03:21'),
(65, 'jailer', 'Jailer', 'Génération / Gestion des jeux de données', 'Génération / Gestion des jeux de données', '2016-11-18 15:03:57', '2016-11-18 15:03:57'),
(66, 'h2', 'H2', 'Base de données', 'Base de données', '2016-11-18 15:04:42', '2016-11-18 15:04:42'),
(67, 'talend', 'Talend OpenStudio (for data integration)', 'Reprise de données', 'Reprise de données', '2016-11-18 15:06:42', '2016-11-21 09:01:57'),
(68, 'javamelody', 'JavaMelody', 'Outil de monitoring', 'Outil de monitoring', '2016-11-18 15:06:42', '2016-11-18 15:06:42'),
(69, 'redmine', 'Redmine', 'Portail de gestion de projet', 'Portail de gestion de projet	', '2016-11-18 15:07:37', '2016-11-18 15:07:37'),
(70, 'fusionforge', 'FusionForge', 'Forge de développement', 'Forge de développement', '2016-11-18 15:08:27', '2016-11-18 15:08:27'),
(71, 'mediawiki', 'Mediawiki', 'Outil pour améliorer la collaboration entre les différentes parties prenantes', 'Outil pour améliorer la collaboration entre les différentes parties prenantes', '2016-11-18 15:08:51', '2016-11-18 15:08:51'),
(72, 'phpbb', 'PhpBB', 'Forum', 'Forum', '2016-11-18 15:09:36', '2016-11-18 15:09:36'),
(73, 'postgresql', 'PostgreSQL', 'Base de données transactionnelle', 'Base de données transactionnelle', '2016-11-18 15:11:17', '2016-11-18 15:11:17'),
(74, 'db2', 'DB2', 'Base de données transactionnelle', 'Base de données transactionnelle', '2016-11-18 15:12:46', '2016-11-18 15:12:46'),
(75, 'maria_db', 'Maria DB', 'Base transactionnelle cluster	', 'Base transactionnelle cluster	', '2016-11-18 15:14:05', '2016-11-18 15:14:05'),
(76, 'postgis', 'PostGIS', 'Base de données Géomatique', 'Base de données Géomatique', '2016-11-18 15:15:04', '2016-11-18 15:15:04'),
(77, 'mongodb', 'MongoDB', 'Base de données NoSQL', 'Base de données NoSQL', '2016-11-18 15:15:47', '2016-11-18 15:15:47'),
(78, 'casandra', 'Casandra', 'Base de données NoSQL', 'Base de données NoSQL', '2016-11-18 15:16:17', '2016-11-18 15:16:17'),
(79, 'pentaho', 'Pentaho', 'Portail décisionnel', 'Portail décisionnel', '2016-11-18 15:17:07', '2016-11-18 15:17:07'),
(80, 'elasticsearch', 'ElasticSearch', 'Indexation et recherche plein texte', 'Indexation et recherche plein texte', '2016-11-18 15:17:53', '2016-11-18 15:17:53'),
(81, 'apache_solr', 'Apache SolR', 'Indexation et recherche plein texte', 'Indexation et recherche plein texte', '2016-11-18 15:18:40', '2016-11-18 15:18:40'),
(82, 'openldap', 'OpenLdap', 'Annuaire', 'Annuaire', '2016-11-18 15:19:12', '2016-11-18 15:19:12'),
(83, 'lemonldap', 'LemonLdap', 'SSO', 'SSO', '2016-11-18 15:19:48', '2016-11-18 15:19:48');

-- --------------------------------------------------------

--
-- Structure de la table 'informations_parents'
--

CREATE TABLE informations_parents (
  idParent int4 NOT NULL,
  idEnfant int4 NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
) ;

--
-- Contenu de la table informations_parents
--

INSERT INTO informations_parents (idParent, idEnfant, created_at, updated_at) VALUES
(85, 61, NULL, NULL),
(81, 39, NULL, NULL),
(82, 41, NULL, NULL),
(82, 40, NULL, NULL),
(79, 35, NULL, NULL),
(80, 37, NULL, NULL),
(79, 36, NULL, NULL),
(81, 38, NULL, NULL),
(83, 42, NULL, NULL),
(84, 43, NULL, NULL),
(84, 44, NULL, NULL),
(84, 45, NULL, NULL),
(84, 46, NULL, NULL),
(84, 48, NULL, NULL),
(85, 49, NULL, NULL),
(85, 50, NULL, NULL),
(85, 58, NULL, NULL),
(85, 59, NULL, NULL),
(85, 60, NULL, NULL),
(85, 62, NULL, NULL),
(85, 63, NULL, NULL),
(85, 64, NULL, NULL),
(85, 65, NULL, NULL),
(85, 66, NULL, NULL),
(85, 67, NULL, NULL),
(85, 68, NULL, NULL),
(86, 69, NULL, NULL),
(86, 70, NULL, NULL),
(86, 71, NULL, NULL),
(86, 72, NULL, NULL),
(87, 73, NULL, NULL),
(87, 74, NULL, NULL),
(87, 75, NULL, NULL),
(87, 76, NULL, NULL),
(88, 77, NULL, NULL),
(88, 78, NULL, NULL),
(89, 79, NULL, NULL),
(90, 80, NULL, NULL),
(90, 81, NULL, NULL),
(91, 82, NULL, NULL),
(91, 83, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table migrations
--

CREATE TABLE migrations (
  migration varchar(255)  NOT NULL,
  batch int4 NOT NULL
) ;

--
-- Contenu de la table migrations
--

INSERT INTO migrations (migration, batch) VALUES
('2016_10_27_083901_create_categories_table', 1),
('2016_10_27_084123_create_informations_table', 2),
('2016_10_27_095453_create_categories_parents_table', 3),
('2016_10_27_100105_create_informations_parents_table', 4);

--
-- Index pour les tables exportées
--

--
-- Index pour la table 'categories'
--
ALTER TABLE categories
  ADD PRIMARY KEY (id),
  ADD UNIQUE (unix);

--
-- Index pour la table categories_parents
--
ALTER TABLE categories_parents
  ADD PRIMARY KEY (idParent,idEnfant);
  ADD CONSTRAINT fk_cats_enfant FOREIGN KEY (idEnfant) REFERENCES categories (id),
  ADD CONSTRAINT fk_cats_parent FOREIGN KEY (idParent) REFERENCES categories (id);
--
-- Index pour la table informations
--
ALTER TABLE informations
  ADD PRIMARY KEY (id),
  ADD UNIQUE (unix);

--
-- Index pour la table informations_parents
--
ALTER TABLE informations_parents
  ADD PRIMARY KEY (idParent,idEnfant),
  ADD CONSTRAINT fk_info_enfant FOREIGN KEY (idEnfant) REFERENCES informations (id),
  ADD CONSTRAINT fk_info_parent FOREIGN KEY (idParent) REFERENCES categories (id);

