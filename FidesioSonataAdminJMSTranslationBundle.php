<?php

namespace Fidesio\SonataAdminJMSTranslationBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * Class Fidesio\SonataAdminJMSTranslationBundle\SeoSASonataAdminJMSTranslationBundle
 */
class FidesioSonataAdminJMSTranslationBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'JMSTranslationBundle';
    }
}
