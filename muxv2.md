# **MUXv2 Design (Software Components)**
1. CONTENT
2. Requirements
3. Overview
4. Database Schema
5. Core:
    - DBif
    - Control Lib 
    - Bag Lib
    - Error Lib
6. Auth Lib
7. Fdr Lib
8. Misc:
    - Log lib
    - SNMP lib
    - Config
        - XMLConfig
        - EdsConfig
    - Tools
        - DBTools
        - NetworkTools
9. 
10. 
11. Apps:
    - Monitor
    - Muxhost
12.
13.

# **Requirements**
| ID   |      System Requirement Document for Mux System      |  Requirement/Optional/Info |
|----------|:-------------|------:|
| SRD962 |  **1. Introduction** |  |
| SRD963 |    MUXv2 is a next generation infrastructure for managing data used for identifying a potential threat in passenger baggage passing through an airport terminal. MUXv2 provides a flexible network of multiplexed Image Generation/Storage and Image Presentation groups as well as providing expansion of the airport bag scanning and analyzing capacity.   |   Information |
| SRD1045 | It is based on redundant and scalable architecture and features high throughput and availability.   |    Information |
| SRD1046 |  MuxV2 shall have compatibility with CTX 9400 and 9000 scanners.  | Requirements |
| SRD1048 |    The MuxV2 shall also have compatability for future 9800 scanners.     |   Requirements |
| SRD1191 | A MUXv2 interface control document shall be published in order to ease CTXx500 integration at a later date  |     |
| SRD1052 |  **2. Glossary** |  |
| SRD1053 |    Data Center - The central database and data storage  (software and hardware) of the Mux System   |   Information |
| SRD1054 | ATRI - Active Threat Resolution Interface |    Information |
| SRD1055 |  PTRI- Passive Threat Resolution Interface | Information |
| SRD1056 |    CI- Control Interface   |   Information |
| SRD1057 | CTX - Bag Scanner |    Information |
| SRD1058 |  Mux Cluster - A group of CTXs, TRIs, CI and a single Mux Server that work together | Information |
| SRD1183 |    STIP - Security Technology Integrated Program   |   Information |
| SRD964 | **3. Overview and functionality of Major MuxV2 System Features** |     |
| SRD965 | **3.1 Multiplexing ATRIs with CTX Scanners** |     |
| SRD966 | The main feature of MUXv2 is the loose coupling between various models of CTXs, their associated devices (Inspection and Reconstruction Computers), Active Threat Resolution Interfaces (ATRIs), Control Interfaces (CIs) and Passive Threat Resolution Intefaces (PTRIs) through a central Data Center. |   Information  |
| SRD967 | Bag data shall be routed to a data center. |    Requirement |
| SRD1157 | From the data center, the ATRIs should be able to retrieve the bag data by a round robin queing system.   |    Requirement |
| SRD1159 | The ATRIs should also be able to retrieve the data from the data server by primary versus secondary queing system |    Requirement |
| SRD1158 |  |     |
| SRD999 | The MuxV2 shall also be compatible with multiple CTXs to provide bag data to ATRIs. |    Information |
| SRD968 | **3.2 Data Center** |     |
| SRD1108 | The data center is the central part of the MuxV2 system. |    Information |
| SRD1112 | The data center shall be composed of two parts, a postgres database and data storage system. Figure 1 belows shows an overview of the data center and it's interfaces. |  Requirement|
| SRD1120 | ![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/1120.PNG "Logo Title Text 1") Figure 1 |   |
| SRD1109 | **3.2.1 Database**|     |
| SRD969 | The postgres database of the data center shall interface with the system components shown in Figure 1 providing fast access capability. |  Requirement   |
| SRD1121 | It shall also be a gateway to the data storage for bag data retrieval for use by Active Threat Resolution Interfaces (ATRIs) and Passive Threat Resolution Interfaces (PTRI).  | Information    |
| SRD1110 | **3.2.2 Data Storage** |     |
| SRD1000 | The data storage shall contain a operational storage tier.   |  Requirement   |
| SRD1113 | The operational tier storage shall store bag image scanned over a 48 hour time period. |  Requirement   |
| SRD1141 | The operational tier storage shall interact with the database providing image files upon request from the database. |   Requirement  |
| SRD1114 | The system shall also be able to backup data over an extended period of time to a customer provided archival storage tier. |  Requirement   |
| SRD970 | **3.3 Control Interface** |     |
| SRD971 | CI, the Control Interface, shall provide a GUI for end users to control one or more CTXs.   |   Requirement  |
| SRD1001 | The CI shall provide GUI controls for starting, stopping, restarting and configuring each CTX.  |  Requirement   |
| SRD1002 | CI shall provide the current status and current configuration for each CTX.     |   Requirement  |
| SRD1152 | Indicator lights as well as error and status messages shall be shown for each CTX on the CI. |   Requirement  |
| SRD1003 | With multiple CTX scanners available for control, the CI shall have the capability to distinguish between CTX models. |  Requirement   |
| SRD1004 | Screen controls based on the CTX model shall be provided for user control. |   Requirement  |
| SRD1153 | One CI shall be have the capability to control all CTXs in one Mux Cluster. |  Requirement   |
| SRD1186 | The CI should be flexible in its association to CTXs providing virtual clustering by CI login. |   Requirement  |
| SRD1005 | The CIs shall interact with the Data Center for CTX Control.  This simplifies the CI start up as it shall only have to connect to the Data Center rather then to all the CTXs.   |  Requirement   |
| SRD1006 | CI users shall be authenticated with the Authentication Library. |  Requirement   |
| SRD972 | **3.4 Active TRIs for Baggage Inspection** |     |
| SRD973 | ATRI- the Active Threat Resolution Inteface is responsible for displaying bag images so that screeners can decide whether to accept or change the machine decision on whether a bag is an alam bag or not.  |  Information   |
| SRD1008 | When bags are held inside the CTX scanner, the ATRI shall allow screeners to perform Hold Inside Mode, allowing operators to request more slices from 9400 and 9000 scanner |   Requirement  |
| SRD1150 | This will help operators in making a decision on the bag |     |
| SRD1151 | The Hold Slice Mode is not available for 9800 scanners. |   Information  |
| SRD1009 | With multiple model scanners integrated into the network, the ATRIs are flexible in that they shall be able to display bag data acquired from a particular scanner. |  Requirement   |
| SRD1012 | For scans from the CTX 9000 and 9400, the ATRI system shall include 2D features for SP Screens. |  Requirement   |
| SRD1013 | For scans from the CTX 9000 and 9400, the ATRI system shall include 2D features for Region Indicators. |   Requirement  |
| SRD1014 | For scans from the CTX 9000 and 9400, the ATRI system shall include 2D features for High Power. |   Requirement  |
| SRD1016 | For scans from the CTX 9000 and 9400, the ATRI system shall include 2D features for Slice Indicators. |  Requirement   |
| SRD1018 | For scans from the CTX 9000 and 9400, the ATRI system shall include 2D features for Slice Scroll Bars. |   Requirement  |
| SRD1019 | For the 9800 scanner, the ATRI should have the flexiblity to switch between 2D displays and 3D displays. |  Requirement   |
| SRD1047 | If a cluster includes a 9800 scanner, then all ATRIs on that cluster shall require a 3D capable hardware. |   Requirement  |
| SRD1185 | The ATRI shall have the scanned bag data loaded into memory within 2 seconds after the trailing edge of the bag has cleared the scanner for 95% of the bags. |  Requirement   |
| SRD1021 | ATRI users shall be authenticated using the Authentication Library. |  Requirement   |
| SRD974 | **3.5 Passive TRIs for Baggage Inspection** |     |
| SRD975 | Bags that remain suspect after the operator inspection are sent to the airport's baggage inspection room (BIR) where they are opened to determine what is inside.  The task is much quicker if the baggage inspectors know where to look in the luggage and what to look for.  Baggage inspectors use Passive TRIs (PTRIs) to display saved images of each they inspect.  This shows them potential threats in the bag and the locations within the bag. |   Information  |
| SRD1023 | Bag images shall be accessed from the Data Center |  Requirement   |
| SRD1025 | In order to assist in the inspection process of suspect bags, the system (which system? TRI? Database?) should provide the capability for filtering based on CTX ID or Bag ID.   |   Optional Requirement  |
| SRD1026 | The PTRI system should also support airport bar code readers and be compatable with Baggage Handling System.  These additional functions will allow inspectors to locate a specific suspect bag and compare it to the corresponding display on the PTRI.  |  Optional Requirement   |
| SRD1068 | **4. Physcial Layout** |     |
| SRD1070 | Components of a Mux System are typically spread out around the airport.  The CTX scanner's are put inline with the baggage handling conveyor belts.  The CIs are generally placed in the same room where the Baggage Handling System is controlled.  The ATRIs are grouped in one (or more) screening rooms.  The PTRIs are located in the baggage inspection room.  The Data Center and network switches are typically in their own server room.   |   Information  |
| SRD1072 | The MuxV2 shall be able to support 3 km distances between the network components. | Requirement    |
| SRD978 | **5. Redundancy** |     |
| SRD979 | The MUXv2 system shall be completely redundant.  No single point of failure (SPOF) shall bring down the system.  |   Requirement  |
| SRD1030 | Being fully redundant, if any of Data Storage components fail, there shall be no drop in service, although applications may experience a delay in the execution of system calls accessing the file system.   |   Requirement  |
| SRD1031 | Recovery from the failure shall take less than 10 seconds from recognition of the failure and shall not lose more than 10 bags per scanner |   Requirement  |
| SRD1032 | Any failover shall be logged and notified to a system administrator. |  Requirement   |
| SRD1033 | In cases of component failure or upgrade,the full redundancy of the system shall allow MUX components to be “hot swappable” allowing replacement of failed parts without bringing the cluster/airport down.  |  Requirement   |
| SRD980 | **6. Performance and Scalability** |     |
| SRD1075 | a. The MuxV2 network shall be able include up to 70 concurrently operating CTX 9000 or CTX 9400 scanners |  Requirement   |
| SRD1077 | b. The MuxV2 network shall be able include up to 150 concurrently operating Active TRIs |  Requirement   |
| SRD984 | c. The MuxV2 network shall be able include up to 150 concurrently operating PassiveTRIs |  Requirement   |
| SRD985 | d. The MuxV2 network shall be able include up to 20 CIs |  Requirement   |
| SRD981 | **7. Network** |     |
| SRD1080 | The switches and cables on the network shall be redundant so that no single point of failure shall bring the cluster/airport down. |  Requirement   |
| SRD1081 | The network shall be capable of handling 1 Gigabyte Bandwidth. |   Requirement  |
| SRD986 | **8. Compatibility With MuxV1** |     |
| SRD987 | MUXv2 shall be able to reuse existing CTX 9000 and 9400 MUXv1 network infrastructure |   Requirement  |
| SRD1144 | To perform this, an upgrade tool shall perform a clean and fast upgrade of the MuxV1 system converting MuxV1 config files into MuxV2 files. |  Information   |
| SRD1051 | Due to it's larger scalability, the cost of MUXv2 shall be less than two or more MUXv1 clusters |  Requirement   |
| SRD988 | **9. Data Storage** |     |
| SRD1134 | **9.1 Components** |     |
| SRD1135 | Within the Data Center, the MuxV2 shall have an Operational Tier. |   Requirement  |
| SRD1155 | The MuxV2 shall also have the software capability for storing data in a customer provided Archival Tier. |  Requirement   |
| SRD1089 | **9.2 Operational Tier** |     |
| SRD989 | The MuxV2 Operational Tier Data Storage shall have 48 hour storage capability.   |  Requirement   |
| SRD1124 | This is designed to make sure bag images are stored over an extended length of time in the event of a plane going down under suspicous circumstances.  The 48 hour storage allows the FAA (or foreign equivalent) to review all bags loaded on that specific plane. |   Information  |
| SRD1125 | The Operational Tier of the Data Storage shall have the storage capacity to be able to store data for an 70 scanner network over a 48 hour period.  |  Requirement   |
| SRD1090 | **9.3 Archival Tier** |     |
| SRD1154 | The Archival Tier hardware is defined and procured by the customer.  MuxV2 system provides the software capability to write data to the assigned storage device.   |  Information   |
| SRD1107 | The system should have the flexibility for operators to schedule the archiving of data to the archival tier. |  Optional Requirement   |
| SRD990 | **10. 1x1 Configuration** |     |
| SRD991 | In a normal Mux system, there can be several TRIs and several CTXs.  In a 1X1 configuration,   there is exactly one ATRI, one CI and one CTX.  |  Information   |
| SRD1136 | The MuxV2 shall allow the CI capability for a 1X1 configuration.  |  Requirement   |
| SRD1029 | In a 1x1 configuration the CI shall be able to adapt to functionality based on the selected CTX model.  |   Requirement  |
| SRD992 | **11. Authentication** |     |
| SRD1174 | Authentication is the mechanism whereby systems may securely identify their users. This process prevents unauthorized users from accessing the system. |   Information  |
| SRD993 | When users start a ATRI, CTX, Recon Computer, Inspection Computer, or CI, they shall be required to first log into the system with their user name and password.   |  Requirement   |
| SRD1168 | Authentication shall be performed by the authentication library located on the specific device being logged into. |  Requirement   |
| SRD1138 | The login process shall determine user privileges for each user based on the user's access level |  Requirement   |
| SRD1170 | The data center shall be used to store authentication information |  Requirement   |
| SRD1087 | The data center should store username and their associated attributes in an LDAP (Lightweight Directory Access Protocol) format. |  Optional Requirement   |
| SRD1184 | The Authentication library should provide flexability to interface with Security Technology Integrated Program (STIP) used for remote maintenance monitoring. |  Optional Requirement   |
| SRD1177 | Figure 2 below shows an overview of the authentication process. |  Information   |
| SRD1179 | ![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/1179.PNG "Logo Title Text 1")|   Information  |
| SRD1180 | Figure 2 |  Information   |
| SRD1172 | **12. Authorization** |     |
| SRD994 | a. The system shall provide Manager access level.. |  Requirement   |
| SRD995 | b. The system shall provide Supervisor access level. |   Requirement  |
| SRD1126 | This is assigned to supervisory positions, responsible for assigning operators to corresponding role as well as performing system control on the data storage. |  Information   |
| SRD996 | c. The system shall provide Field Service access level. |  Requirement   |
| SRD1127 | This is assigned to field service engineers/technicians for performing maintenance and upgrades on the system. |  Information   |
| SRD1084 | d. The system shall provide Controller access level. |   Requirement  |
| SRD1131 | This is assigned to operators controlling conveyors, CTXs and other equipment in the Bag Handling System  |   Information  |
| SRD1086 | e. The system shall provide Screener access level. |  Requirement   |
| SRD1128 | This is assigned for baggage inspectors to allow viewing and inspection of bags. | Information    |
| SRD997 | **13. Field Data Reporting** |     |
| SRD998 | Field Data Reporting (FDR) is a system that supports the collection of statitical data about the performance of the MUX system.  This data can be used to judge the health of the system and is used in detecting trends of potential issues of the system.  |  Information   |
| SRD1188 | System shall support FDR as defined by TSA standard. |     |
| SRD1042 | FDR entries are collected at various points in the MUX system, such as the ATRIs, and then shall be forwarded to the data center for storage. |  Requirement   |
| SRD1187 | FDR data shall be stored in a relational database |     |
| SRD1043 | A standard reporting tool shall be able to access the data center in order to retrieve the FDR data on demand. |  Requirement   |
| SRD1044 | The reporting tool should allow flexibility to allow operators to generate custom reports onsite. |   Optional Requirement  |
| SRD1062 | **14. Field Installation** |     |
| SRD1064 | Whether it's uprading from MuxV1 or new installation, installation of MuxV2 shall be straightforward and easy |   Information  |
| SRD1148 | Once the hardware is in place, installation of MuxV2 shall take less then 8 hours. |  Requirement   |
| SRD1066 | Upon installation, MuxV2 will allow flexiblity in adding additional components to a cluster, such as a new CTX or ATRI. |   Requirement  |

# **Overview**
The figure below describes the hardware layout with the new architecture
