<p align="left"> 
<img style="padding: 0 15px; float: left;" src="images/spring-boot-logo.png" width="70">
</p>

# Auto-Scalable Spring Boot Cluster 

Reliable [Spring Boot](https://projects.spring.io/spring-boot/) Сluster with preconfigured alerts on high load and auto-scaling configurations.

## Spring Boot Cluster Topology

The current Spring Boot solution is implemented using the following software stacks:

- *Load balancer* (LB) - dockerized template with *NGINX 1.10.1*
- *Application server* (AS) - native template with *Spring Boot 1.5.2* on top of *Java 8*

Herewith, each LB and AS container has the default [vertical scaling](https://docs.jelastic.com/automatic-vertical-scaling) limit up to 16 cloudlets (equals to 2 GiB of RAM and 6.4 GHz of CPU per node) and a set of [load alerts](https://docs.jelastic.com/load-alerts) (to notify you when resource consumption comes close to instance threshold). In addition, connection to the cluster is secured with [Jelastic SSL](https://docs.jelastic.com/jelastic-ssl).
 
<p align="left"> 
<img src="images/spring-boot-cluster-topology.png" width="600">
</p>

During installation, you define a number of Spring Boot application servers in the cluster (up to 10 instances), which will be automatically [scaled in/out](https://docs.jelastic.com/automatic-horizontal-scaling) in order to handle the dynamically changing amount of incoming traffic.

## How to Install Auto-Scalable Spring Boot Cluster

In order to get Spring Boot Cluster solution instantly deployed, click the **Deploy to Jelastic** button below and specify your email address within the opened widget. Then choose one of the [Jelastic Public Cloud](https://jelastic.cloud) providers (in case you don’t have an account at the appropriate platform, it will be created automatically) and click **Install**.

[![Deploy](images/deploy-to-jelastic.png)](https://jelastic.com/install-application/?manifest=https://raw.githubusercontent.com/jelastic-jps/spring-boot/master/manifest.jps)

If you have Jelastic account, log in to the dashboard and **Import** the required [JPS](https://docs.jelastic.com/jps) manifest using the link: 
[https://github.com/jelastic-jps/spring-boot/blob/master/manifest.jps](https://github.com/jelastic-jps/spring-boot/blob/master/manifest.jps)

<p align="left"> 
<img src="images/import-general.png" width="500">
</p>

Fill in the installation form with the following data:

- *Nodes in Cluster* - a number of application servers your cluster should include
- Choose deployment type:
   - *Clean Cluster* - to create a bare cluster with no application inside
   - *Deploy JAR* - to deploy *JAR* application from the specified custom repository
   
If required, change *Environment name*, *Display Name* ([alias](https://docs.jelastic.com/environment-aliases)), [Region](https://docs.jelastic.com/environment-regions) and click **Install**.

<p align="left">
<img src="images/spring-boot-cluster-installation.png" width="500">
</p>

Refer to the linked article for more information on [working with the Spring Boot](http://blog.jelastic.com/2017/04/27/hosting-spring-boot-java-applications/) in Jelastic Cloud.


## Spring Boot JAR Builder for Running Microservices

If you want to build and deploy your applications as microservice, feel free to use the preconfigured add-ons for automatic building Spring Boot projects of the following types:

- [Fat(Uber)](https://github.com/jelastic-jps/spring-boot/tree/master/microservice-fat-jar)
- [Thin](https://github.com/jelastic-jps/spring-boot/tree/master/microservice-thin-jar)

### Managed Hosting Business on Spring Boot Cluster

To start offering this solution to your customers please follow to [Managed PaaS Hosting Business](https://jelastic.com/apaas/)
