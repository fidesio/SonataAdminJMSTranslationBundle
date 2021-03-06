KASonataAdminJMSTranslationBundle
====================

Features:
--------------
- Integrate JMSTranslationBundle with SonataAdminBundle
- Provides add translation message form
- Invalidate cache from web-interface
- Remove translation from web-interface

Installation:
--------------

### Step 1: Download KASonataAdminJMSTranslationBundle using composer

Add KASonataAdminJMSTranslationBundle in your composer.json:


#### For Sonata admin <=2.2 use:
```js
{
    "require": {
        "kluev-andrew/sonata-admin-jms-translations": "dev-master"
    }
}
```
#### For Sonata admin >=2.3 use:
```js
{
    "require": {
        "kluev-andrew/sonata-admin-jms-translations": ">=2.3"
    }
}
```

Now tell composer to download the bundle by running the command:

``` bash
$ php composer.phar update kluev-andrew/sonata-admin-jms-translations
```

Composer will install the bundle to your project's `KA/SonataAdminJMSTranslationBundle` directory.

### Step 2: Enable the bundle

Enable the bundle in the kernel:

``` php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new JMS\DiExtraBundle\JMSDiExtraBundle($this),
        new JMS\AopBundle\JMSAopBundle(),
        new JMS\TranslationBundle\JMSTranslationBundle(),
        new Fidesio\SonataAdminJMSTranslationBundle\KASonataAdminJMSTranslationBundle(),
        // ...
    );
}
```

### Step 3: Import KASonataAdminJMSTranslationBundle routing

In YAML somthing like:

``` yaml
# app/config/routing.yml

admin:
    resource: '@SonataAdminBundle/Resources/config/routing/sonata_admin.xml'
    prefix: /admin

KASonataAdminJMSTranslationBundle_ui:
    resource: @KASonataAdminJMSTranslationBundle/Controller/
    type:     annotation
    prefix:   /admin/translations
```

### Step 4: Override your Sonata Admin Layout

a) Set configuration:

``` yaml
# app/config/config.yml

sonata_admin:
    templates:
        # default global templates
        layout:  AcmeBundle:CRUD:layout.html.twig
```

b) Create template
```
{# AcmeBundle/Resources/views/CRUD/layout.html.twig #}

{% extends 'SonataAdminBundle::standard_layout.html.twig' %}

{% block side_bar_after_nav %}
    <ul class="sidebar-menu">
        <li>
            <a href="{{ path('jms_translation_index') }}">
                <i class="fa fa-angle-double-right"></i>
                <span>JMSTranslations</span>
            </a>
        </li>
    </ul>
{% endblock %}
```

### Step 5:
Don't forget to configure you [SonataAdminBundle](https://github.com/sonata-project/SonataAdminBundle) and [JMSTranslationBundle](https://github.com/schmittjoh/JMSTranslationBundle)

