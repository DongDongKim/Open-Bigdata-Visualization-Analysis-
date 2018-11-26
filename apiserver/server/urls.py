from django.conf.urls import url, include
# from router.processor import outlier
from . import views
from .router.processor import outlier, notavailable, removeColumns, transform, stratification
from .router.analyzer import a,regression, apriori, anova, correlation, covariance


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^outlier$', outlier.process, name='outlier'),
    url(r'^notavailable$', notavailable.process, name='notavailable'),
    url(r'^removeColumns$', removeColumns.process, name='removeColumns'),
    url(r'^transform$', transform.process, name='transform'),
    url(r'^regression$', regression.process, name='regression'),
    url(r'^apriori$', apriori.process, name='apriori'),
    url(r'^anova$', anova.process, name='anova'),
    url(r'^correlation$', correlation.process, name='correlation'),
    url(r'^covariance$', covariance.process, name='covariance'),
    url(r'^stratification$', stratification.process, name='stratification')
]
