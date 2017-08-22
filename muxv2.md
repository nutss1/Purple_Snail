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
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/1.PNG "Logo Title Text 1")
The concept of a single highly available data store is replaced with a NAS pool. Each NAS in the pool has HDD’s configured in a redundant RAID setup and all the NASes together are treated as a redundant storage. The NAS pool is effectively a Redundant Array of Inexpensive NASes(RAIN).

A high level illustration of how the redundancy is achieved is described below.
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/2.PNG "Logo Title Text 1")
Similarly, when a bag is read.
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/3.PNG "Logo Title Text 1")
Sequence of interactions between the various parts.

##### **14.1.1.1 Database Sequence**
- Database is configured with a set of COTS Servers with lots of storage. These are the NASes – our applications use http to access file data rather than traditional network filesystems.
- Database procedures are modified to provide a pair of NAS targets from the RAIN for any write.
- Database provides the same pair of NAS targets for a corresponding read – the two NAS target will be referred to as a NAS-set. (A corresponding read means read access of the same bag from a UI computer.)
- Database is responsible for tracking the NAS-set associated with a bag at all times. This approach effectively provides us with a RAID10 (both striping and mirroring).data redundancy at the bag level We will refer to this datastore as a RAIN
- When a NAS is completely offline, the database has the metadata to recreate the lost data into a new/replaced NAS. A process (called RAIN-Maker) can then be scheduled by an FSE to re-populate the data to the new NAS when the failed NAS is replaced.  This can be scheduled to run automatically at off-peak hours.

##### **14.1.1.2 Active TRI - Sequence**
- Scanner saves the bag to an in-memory storage queue (how the bag is removed from memory is described below)
- Scanner, in parallel starts writing the bag to the NAS set. 
- Scanner updates database with bag status=INSPECTED without waiting for the save to complete
- The database now has the http path to the bag on each NAS
- Active TRI (via BagLib) polls database for bags with status=INSPECTED
- Once BagLib finds a bag, it gets the bag path from the database and locks the bag with status=TRI_INSPECTING
- BagLib checks if the scanner has the bag in memory
- If yes, bag is fetched from memory to the TRI. Parallel fetches from different TRIs is possible and will be supported
- If no, BagLib uses the NAS to retrieve the bag (both functional & error usecases described below)
- TRI updates database with bag decision and clears bag

Bag status is modified to TRI-INSPECTED at this point.
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/4.PNG "Logo Title Text 1")
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/5.PNG "Logo Title Text 1")

The figure above describes the flow of data to the Active TRI.

##### **14.1.1.3 Passive TRI - Sequence**
- Passive TRI (via BagLib) polls database for bags with status=TRI_INSPECTED, PTRI_VIEWED or ERROR within a given time window (and other query constraints like scanner wildcard)
- A bag from the displayed list is selected by the user
- BagLib fetches the bag from the NAS set using the bag path
- TRI displays the bag

 ![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/6.PNG "Logo Title Text 1")
 ![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/7.PNG "Logo Title Text 1")
The figure above describes the flow of data to the Passive TRI.

##### **14.1.1.4 Scanner - Sequence**
- On receiving machine decision, the scanner has the complete bag. It submits the bag to the BagLib.
- BagLib writes the bag to a in-memory circular-queue (of fixed size which can be configured on a per-scanner-model basis)
- Bag is marked with a timestamp at this point (where? In the db? Is this the state=INSPECTED part?)
- BagLib starts writing to the NAS set in the background
- BagLib is listening on a socket for incoming requests for bags based on bag-guid (the unique bag key)
- When a request is received, BagLib fetches the bag from the circular-queue, locks the bag in memory and starts a timer
- Once the bag has been successfully sent out, the bag is unlocked
- If the timer fires before the bag has been successfully sent out, this is because of communication issues. BagLib terminates connection and unlocks the bag (a warning is sent out to CI that the bag was not persisted in any NAS)
- Bags are automatically overwritten when the queue limit is reached – the oldest bags from the queue are deleted first. Bags will be timed out aggressively if the scanner is not able to send the bags over to a NAS. These bags will not be persisted and therefore will not be available for a Passive TRI. Future enhancements may have the bag stored locally for a short period of time.

The size of the queue and the values of the timers have to be worked out and maybe customized based on the scanner’s estimated throughput. Bags stay cached for the longest time possible – the current load on the scanner drives the deletion times of the bags from the queue. It is therefore possible that bags can be cached for a longer time during low throughput hours & at shift ends.

The figure below describes the high-level interactions.
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/8.PNG "Logo Title Text 1")

##### **14.1.1.5 NAS offline - Sequence**
- Monitoring thread on each NAS checks every other NAS for read/write status
- If a NAS fails any of the tests, the thread disables the NAS from the database. The NAS also sends a notification to CI about the malfunctioning NAS.
- All new bag writes (and therefore reads) will stop using this NAS till it is marked online again through either an automatic resolution of a transient issue in the network or NAS or through manual intervention by the FSE
- When the NAS reappears online, the monitoring thread starts monitoring this NAS
- If read/write tests succeed, the NAS is re-initiated into the pool of available NASes in the database
- The database starts using this NAS when it provides NAS sets to different scanners

**Note:**	Any redundant data lost due to the failure of the NAS will not be automatically duplicated. See 2.1.2.6 for the requirements on the tool for the FSE to schedule the rebuilding of redundancy so it can be executed at a time that will limit the impact it has on airport operations.

##### **14.1.1.6 Database Recovery - Sequence**
- Recovery tool is told to recover a selected NAS

**Note:**	At this point, it is assumed that the faulty NAS has been replaced with a functional one of similar performance or better
- Recovery tool queries the database for all bags related to this NAS
- Each bag is associated with a NAS set
- Recovery tool selects the second path in the NAS set and copies over the data from the second path to the replaced NAS
- At the end of this process, the data redundancy has been restored
- Tool is manual for the FSE to initiate when needed.
- Tool has a schedule feature that allows the FSE to schedule how long the tool can run. 

###### **14.1.1.6.1 Limitations**
- As in a RAID, loss of two NASes within a given window may result in data loss. This presupposes that both the NAS hardware and the NAS drives are beyond recovery at this point.
- During the period where a failed NAS has not been discovered, a few bags may not be redundant. The database will mark them as being archived on just one NAS.

##### **14.1.1.7 Incomplete Bag Write Handling**
- There is a possibility that a bag is still in the process of being written when a TRI/PTRI attempts to access it from one of the NAS set. The scenario is this:
    - Scanner sends the bag over to the NAS set
    - Scanner removes the bag from its queue due to its current load
    - TRI follows the protocol – first trying the scanner and then going to the NAS where the bag may still be in the process of being written. This will cause the TRI to attempt loading a partial bag.

The approach to this use-case is to provide a flag on the database that the bag has been written successfully on at least one NAS. When the TRI attempts to load a bag & finds the NAS flag set, it will attempt to load the bag from the NAS, else it will unlock the bag and move it to the TRI_WAITING state. The bag will stay in this state till a NAS has completed writing the data to disk – once this is complete, NAS will change the bag’s state to INSPECTED.

The next TRI which queries the db will find this bag, look for the state INSPECTED and attempt to load it only if the flag is set.

If the flag is never set, the bag will be timed out by the bag cleanup monitoring (which will mark this bag as timed-out so that no TRI loads this bag – this is the same functionality that exists today)

The figure below describes the software interactions between the scanner, the NAS and the TRI.
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/9.PNG "Logo Title Text 1")
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/10.PNG "Logo Title Text 1")

## **14. Database Schema**
The lookup tables are index-organized with rows representing values to which other rows of non-lookup tables are pointing.  The lookup tables are created and populated when the database management system starts up from the DB configuration file.  The lookup tables could be seen as ”static” because they are modified only in rare occasion (adding a new type of machine for example) and are identical across data centers.

The administrative tables are created from MUX configuration files or by an administrator through the Supervisor Control Interface. They represent the five entities around which information is manipulated: user (human), machine (sensors), host (computer), application (software) and bag. The administrative records hold information on which machine or computer is connected to the system, which software is authorized to run, where to find the bag data, and who is able to do what.  The administrative tables are unique to each data center.

The dynamic tables are a collection of records that control and report the status of machines, software applications and bags. Records are created from administrative tables for machines and software applications when the database management system starts up. Bags and decision records are inserted on new bag and new decision events. Each new bag event generates a bag record in a generic table and another in bag-machine specific table. There are as many bag-machine specific tables as type of sensors connected to the system.

![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/11.PNG "Logo Title Text 1")

## **15. Lookup tables**
The lookup tables are index-organized tables with rows stored in primary key order. They are created from database configuration files depending of the release version of the database.

### **15.1 Bag Status**
The status of a bag going through a CTX and requiring On Screen Resolution follows sequential steps (Figure 2). The BAG_STATUS_TAB holds the various status of a bag. Each status allows or blocks actions from specific subsystems that translate in a set of rules for the subsystems. For example, inspection subsystems process only bags reconstructed, TRI subsystem display only bag already inspected. The table could be extended to include bag status for other sensors like XRD…

#### **15.1.1 BAG_STATUS_TAB Schema**
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/12.PNG "Logo Title Text 1")

#### **15.1.2 Bag Status Diagram**
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/13.PNG "Logo Title Text 1")

#### **15.1.3 Example of BAG_STATUS_TAB**
| INDEX  | STATUS  |  DESCRIPTION |   
|---|---|---|
|  0 |  NEW |  Bag has been created in the system (most of the time because it has been loaded into a machine). It is the default value when the Bag Record is created. |   
|  1 |  ACQUIRING |  Acquisition started to acquire data for the bag. |   
|  2 |  RECONSTRUCTING |  Reconstruction of the bag has started. |  
|  3 |  ACQUIRED |  Acquisition is done with the bag |   
|  4 |  RECONSTRUCTED |  Reconstruction of the bag is done. Bag folder is available and ready for inspection. |   
|  5 |  INSPECTING |  Inspection started  |  
|  6 |  INSPECTED |  Inspection is done with the bag. Inspection results have been written under the bag folder and the inspection decision is available. Operator decision will be rendered after On Screen Resolution by TRI. |   
|  7 | TRI_INSPECTING  |  The bag is being displayed to an operator or queued in one of the TRI |
|  8 |  TRI_INSPECTED | An operator has resolved the bag. The decision has been written under the bag folder. Inspection decision is available. Operator decision is available and is suspect (clear bags are Done). The overall bag decision will be rendered after PTRI inspection.  |  
|  9 |  PTRI_VIEWING |  The bag is being displayed to an operator in one of the PTRI |   
|  10 |  DONE |  Done with the bag (CTX-9800). The overall bag decision is available. The bag data and associated records will be deleted in 48h. |   
|  11 | CTX_FAULT  |  A failure occurs when scanning the bag or the bag has been flushed from the machine without being scanned. There is no bag decision available. See BAG_ERROR_TAB for fault description. |  
|  12 |  RECON_ERROR |  The bag data is corrupted preventing reconstruction. There is no bag decision available. See BAG_ERROR_TAB for possible error description. |   
|  13 |  INSP_ERROR |  The bag data is corrupted or cannot be found preventing inspection. Inspection (machine) decision is Error and the overall bag decision is Error. See BAG_ERROR_TAB for error description. |   
|  14 |  TRI_ERROR |  The bag data is corrupted or cannot be found preventing on screen resolution. Inspection (machine) decision is available and operator decision is Error. The overall bag decision is Error. See BAG_ERROR_TAB for error description. |  
|  15 |  TIMED_OUT | The Bag Maximum Travel Time (BMTT) or Guaranteed Operator View Time (GOVT) expired. Inspection (machine) decision shall be available and operator decision is Unknown. The overall bag decision is Unknown.  |   
|  ... |   |   |   
|  100 |  XRD_SCAN |  XRD is scanning |   
|  101 | XRD_INSPECTING  |  XRD inspection started |  
|  ... |   |   |  

### **15.2 BAG ERROR**
During the life of the bag, the various subsystems processing it could fail. In this case, the bag status is set to error or fault and additional information (error code, text…) corresponding to the failure are held in the BAG_ERROR_TAB (See Error Event Models).

#### **15.2.1 BAG_ERROR_TAB Schema**
| FIELDS  | DATA TYPE  | DESCRIPTION  |  SOURCE |   
|---|---|---|---|
|  INDEX |  INTEGER |  Index of bag error (Primary Key) | Database configuration file   |   
|  ERROR_CODE |  INTEGER |  Internal error code | Database configuration file   |   
| ERROR_TEXT  |  CHAR [24] |  Corresponding text (human readable) |  Database configuration file  |   
|  DESCRIPTION |  VARCHAR [120] |  Bag error description: Used for diagnostic purpose, FSE support…  |   Database configuration file |   

#### **15.2.2 Example of BAG_ERROR_TAB**
|  INDEX |  ERROR_CODE |  ERROR_TEXT | DESCRIPTION  |   
|---|---|---|---|
|  0 |  0 |  NONE |  No Error |   
|  1 |  1 |  FLUSH | Bag Flushed Before Acquisition (status=CTX_FAULT)  |   
|  ... |   |   |   |   
|  100 | 1100  | ACQ_NO  | No Acquisition. Start Acquisition acknowledgement is missing (status=CTX_FAULT)  |   
|  101 | 1101  |  ACQ_INCOMP |  Incomplete Acquisition. End Acquisition acknowledgement is missing (status=CTX_FAULT) |   
|  102 | 1102  | ACQ_BADDATA  |  Bad data coming from DCB encoder count… (status=CTX_FAULT) |   
|  103 | 1103  | ACQ_CHOCK  |  Acquisition Buffer Full (status=CTX_FAULT) |   
|  ... |   |   |   |   
|  200 |  1200 |  RECON_CORRUPT |  Cannot Reconstruct. Corrupted Raw data (status=RECON_ERROR) |   
|  ... |   |   |   |   
|  301 |  1301 |  INSP_CORRUPT |  Cannot Inspect. Corrupted image data (status =INSP_ERROR) |   
|  302 |  1302 |  INSP_NOTFOUND |  Bag not found on the central store (status=INSP_ERROR) |   
|  303 |  1303 | INSP_WARNING  |  Slippage (status=INSP_ERROR) |   
|  ... |   |   |   |   
|  400 |  1400 |  TRI_CORRUPT |  Cannot Display. Corrupted image data (status=TRI_ERROR) |   
|  401 |  1401 |  TRI_NOTFOUND |  Bag not found on the central store (status=TRI_ERROR) |   
|  402 |  1402 |  TRI_THRTCORRUPT |  Cannot Display Threat. Corrupted inspection results (status=TRI_ERROR) |   
|  ... |   |   |   |   
|  500 |  1500 |  IQ_FAULT | Not an IQ Bag (status=INSP_ERROR)  |   
|  501 |  1501 |  IQ_STRAIGHT |  IQ Bag Not Straight (status=INSP_ERROR) |   
|  502 |  1502 |  IQ_WRONGSIZE |  IQ Bag Wrong Size (width, length…) (status=INSP_ERROR) |   
|  503 |  1503 |  IQ_NOTFOUND |  IQ Bag data not found on the central store (status= INSP_ERROR) |   
|  ... |   |   |   |   

### **15.3 DECISION**
The DECISION_TAB holds the possible decisions that are passed to the BHS system through the Airport Interface subsystem. Note the distinction between Pending, No, Unknown and Error decisions. 
Pending decision is the default bag decision when registered in the database. 
No decision means that a decision cannot be expected for the bag. The bag has not been scanned correctly and data is missing. The bag status is either CTX_FAULT or RECON_ERROR. 
Error decision occurs when the decision processors like inspection or TRI cannot render a clear or suspect decision. The bag status is either INSP_ERROR or TRI_ERROR.  
Unknown decision means that a timer has expired, either Bag Maximum Travel Time (BMTT) or Guaranteed Operator View Time (GOVT). The corresponding bag status is TIMED_OUT.
Today, there is no requirement for having the PTRI rendering a clear or suspect decision. The “Viewed” decision is reserved for acknowledging the fact that an operator looked at the bag.

#### **15.3.1 DECISION_TAB Schema**
|  FIELDS |  DATA TYPE |  DESCRIPTION | SOURCE  |   
|---|---|---|---|
|  INDEX |  INTEGER |  Index of decision (Primary Key) |  Database configuration file  |   
|  DECISION |  CHAR [24] |  Corresponding text (human readable) |  Database configuration file  |   
| DESCRIPTION  |  VARCHAR [120] |  Description of decision.   |  Database configuration file  |   
#### **15.3.2 Example of DECISION_TAB**
|  INDEX |  DECISION |  DESCRIPTION |
|---|---|---|
|  0 |  PENDING | Decision is still pending (default value)  |
|  1 |  NO | No decision available  |
|  2 |  CLEAR |  Clear decision available |
|  3 |  SUSPECT |  Suspect decision available |
|  4 |  UNKNOWN_BMTT |  Bag Maximum Travel Time (BMTT) timed out operator decision is unknown |
|  5 |  UNKNOWN_GOVT |  Guaranteed Operator View Time (GOVT) timed out operator decision is unknown |
|  6 |  ERROR |  Decision cannot be render due to decision processor errors (Inspection, TRI…) |
|  7 |  IQ_SUCCESS | Successful IQ Test   |
|  8 |  IQ_FAIL |  Failed IQ Test  |
|  9 |  VIEWED | Eventually needed for PTRI if Clear/suspect not required  |
|  ... |   |   |


### **15.4 INSTALL STATE**
The INSTALL_TAB holds the physical install states of machines and computers. It permits to keep references to machines and computers that have been removed or taken offline and plan for future system extension. 

#### **15.4.1 INSTALL_TAB Schema**
|  FIELDS |  DATA TYPE | DESCRIPTION  |  SOURCE |
|---|---|---|---|
|  INDEX | INTEGER  |  Index of installation state (Primary Key) | Database configuration file   |   
|  INSTALL_STATE | CHAR [24]  |  Corresponding text (human readable) |  Database configuration file  |   
|  DESCRIPTION | VARCHAR [120]  |  Install state description: describes what the state means physically  |  Database configuration file  |   

#### **15.4.2 Example of INSTALL_TAB**
|  INDEX |  INSTALL_STATE |  DESCRIPTION |
|---|---|---|
|  0 | FUTURE  |  Installation planned in the future (placeholder) |   
|  1 |  OPERATIONAL | Operational  |   
|  2 |  NON_OPERATIONAL |  Not in Operation but physically present |   
|  3 |  DECOMMISSIONED |  Physically Removed |   
|  ... |   |   |   

### **15.5 MACHINE TYPE**
The MACH_TYPE_TAB holds the type of machines allowed to connect to the system. The type of machine is used to find out in which bag-machine specific table the bag record has been inserted (see BAG_TAB).

#### **15.5.1	MACH_TYPE_TAB Schema**
|  FIELDS | DATA TYPE  | DESCRIPTION  | SOURCE  | 
|---|---|---|---|
|  INDEX |  INTEGER |  Index of machine type (Primary Key)  |  Database configuration file  |   
|  TYPE |  CHAR [24] |  Corresponding text (human readable) |  Database configuration file  |   
|  SENSOR |  CHAR [24] |  Sensor type for the machine  |  Database configuration file  |   
|  DESCRIPTION |  VARCHAR [120] |  Machine type description  |  Database configuration file  |   

#### **15.5.2 Example of MACH_TYPE_TAB**
|  INDEX |  TYPE |  SENSOR |  DESCRIPTION |   
|---|---|---|---|
|  0 |  9800 |  CTX |  CTX-9800 EDS sensor third generation |   
|  1 |  9400 |  CTX |  CTX-9400 EDS sensor second generation |   
|  2 |  9000 |  CTX |  CTX-9000 EDS sensor first generation |   
|  3 |  X500 |  CTX |  CTX-2500 and CTX-5500 EDS sensor first generation |   
|  4 |  2800 |  CTX |  CTX-2800 EDS sensor third generation |   
|  5 |  3500 |  XRD |  XDR-3500  |   
|  ... |   |   |   |   

### **15.6 MACHINE STATUS**
Each machine follows a state diagram (Figure 3). The MACH_STATUS_TAB holds the various states for the machine. Only CTX-9800 states are represented but the table can be extended to include specific state for other sensors.

#### **15.6.1 MACH_STATUS_TAB Schema**
|  FIELDS |  DATA TYPE |  DESCRIPTION |  SOURCE |   
|---|---|---|---|
|  INDEX |  INTEGER |  Index of machine status (Primary Key) | Database configuration file  |   
|  STATUS |  CHAR [24] | Corresponding text (human readable)  |  Database configuration file |   
|  DESCRIPTION |  VARCHAR [120] |  Status description: describes main tasks performed by the machine in this state |  Database configuration file |   

#### **15.6.2 Machine Status Diagram**
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/14.PNG "Logo Title Text 1")

#### **15.6.3	Example of MACH_STATUS_TAB**
|  INDEX |  STATUS |  DESCRIPTION |      
|---|---|---|
|  0 |  SHUTDOWN |  Power can be turned off |      
|  1 |  ALIVE |  Machine Control computer and application is up and running. Acquisition computer should be on but communication between acquisition and machine control subsystems has not yet been established.  |      
|  2 |  ON |  The Start Command has been sent from the Control Interface. The Green Button is lit and the GB timer has started. SDS commands must be cleared. |   
|  3 |  STARTUP |  The Green Button has been pressed. Interlock and ESTOP circuits are closed. The machine startup sequence has started, applying power to the Servo, Gantry (Slip-ring)… Communication between Machine Control and Acquisition subsystems is established. |      
|  4 |  FLUSH |  Bags inside the machine are flushed |      
|  5 |  WARMUP |  Tube Warm-up sequence has started |   
|  6 |  FAULT |  The machine is in fault; the corresponding error code for the machine is set. |      
|  7 |  RESET |  A fault reset from the Control Interface has been initiated or the auto recovery sequence has started, |      
|  8 |  READY | The machine is empty and ready to accept new bag  |   
|  9 |  OFFSET |  The offset calibration sequence has started |      
|  10 |  GAIN |  The gain calibration sequence has started |      
|  11 |  DIEBACK |  The exit conveyor is not ready preventing unload of bags |   
|  12 |  STANDBY |  The machine is empty and a standby command has been initiated from the Control Interface or the automatic idle timer has expired |      
|  13 |  CHOCKING |  Recon subsystem is chocking. Acquisition buffer is almost full. Machine Control may pause preventing new bag in the machine or under the X-ray zone. |      
|  14 |  SCAN |  The machine is loading, scanning and unloading bags |   
|  ... |   |   |      

### **15.7 MACHINE OPERATIONAL MODE** 
The MACH_OPER_TAB holds the various operational modes for the machine.  The machine can be controlled remotely (from the Control Interface through commands) or locally. A key switch gives local control of the machine to perform basic operations like calibration/diagnostic, IQ testing or even starting conveyor mode if the network is not available.

#### **15.7.1	MACH_OPER_TAB Schema**
|  FIELDS |  DATA TYPE |  DESCRIPTION |  SOURCE |   
|---|---|---|---|
|  INDEX |  INTEGER |  Index of operation mode (Primary Key) | Database configuration file |   
|  OPER_MODE |  CHAR [24] |  Corresponding text (human readable) |  Database configuration file |
|  DESCRIPTION |  VARCHAR [120] |  Operational mode description: describes condition of utilization  |  Database configuration file  |  

#### **15.7.2	Example of MACH_OPER_TAB**
|  INDEX |  OPER_MODE |  DESCRIPTION |      
|---|---|---|
|  0 |  REMOTE_SCAN |  Regular Scan Mode (Control is given to the SCI through Commands)  |     
|  1 |  REMOTE_IQ | IQ Mode Controlled from SCI  |   
|  2 |  REMOTE_CVM | Conveyor Mode Controlled from SCI  |  
|  3 |  REMOTE_FSE | Field Service Mode or Machine Calibration Mode Controlled from SCI: CT Scale, Fan Offset, Image Tilt, and bad Detectors…  |     
|  4 |  LOCAL_IQ |  Local Switch or Key is IQ Mode. Force the Machine in Standalone Mode (Exit and Entry Non-Integrated). Insertion of a bag is performed through a local Insert Push Button. |   
|  5 |  LOCAL_CVM | Local Switch or Key is Conveyor Mode in case network is not available.  |    
|  6 |  LOCAL_FSE | Local Switch or Key is FSE Mode. Machine Calibration is performed through a Field Service Workstation. |     
|  ... |   |   |   

### **15.8 MACHINE COMMAND**
The MACH_CMD_TAB holds the various commands that can be initiated from the Control Interface when the operational mode of the machine has been set to remote.

#### **15.8.1	MACH_CMD_TAB Schema**
|  FIELDS |  DATA TYPE |  DESCRIPTION | SOURCE  |   
|---|---|---|---|
|  INDEX |  INTEGER | Index of machine command (Primary Key)   |  Database configuration file  |   
|  COMMAND |  CHAR [24] |  Corresponding text (human readable) |  Database configuration file  |   
|  DESCRIPTION |  VARCHAR [120] |  Command description: describes conditions for enabling the command |  Database configuration file  |   

#### **15.8.2	Example of MACH_CMD_TAB**
|  INDEX |  COMMAND |  DESCRIPTION |      
|---|---|---|
|  0 |  SHUTDOWN | Shutdown  |      
|  1 |  START |  Start (available only in Alive state) |      
|  2 |  RESTART | Restart (available only in Fault State)  |      
|  3 |  FAULT_RESET | Fault Reset (available only in Fault State)  |      
|  4 |  OFFSET_GAIN_CALIB |  Offset and Gain Calibration (available only in Ready, Scan or Standby State)  |      
|  5 |  STANDBY | Standby (available only in Ready State)  |   
|  6 |  INSERT |  Manual Insert of bag (available only if Entry is Non-Integrated) |      
|  7 |  CVM_START |  REMOTE_CVM only |      
|  8 |  CVM_STOP | REMOTE_CVM only  |   
|  9 |  REDO_BAG_START |  REMOTE_FSE or REMOTE_IQ: Burn-in, IQ Bag Collect for CT Scale… |      
|  10 | REDO_BAG_STOP  | REMOTE_FSE or REMOTE_IQ  |      
|  11 | 5PIN_SCAN  | REMOTE_FSE: Fan Offset Setting  |  
|  ...|   |   |

### **15.9 MACHINE ERROR**
When the machine is in fault state, the MACH_ERROR_TAB provides the corresponding error codes. The errors provided are just an example…

#### **15.9.1	MACH_ERROR_TAB Schema**
| FIELDS  |  DATA TYPE |  DESCRIPTION |  SOURCE |   
|---|---|---|---|
|  INDEX | INTEGER  |  Index of machine error (Primary Key) | Database configuration file   |  
|  ERROR_CODE |  INTEGER | Internal error code  |  Database configuration file  |   
|  ERROR_TEXT | CHAR [24]  |  Corresponding text (human readable) |  Database configuration file  |   
|  DESCRIPTION |  VARCHAR [120] |  Machine error description: Used for diagnostic purpose, FSE support…  |   Database configuration file |   

#### **15.9.2	Example of MACH_ERROR_TAB**
| INDEX  |  ERROR_CODE |  ERROR_TEXT |  DESCRIPTION |   
|---|---|---|---|
|  0 |  0 |  NONE | No Error  |   
|  1 |  101 |  OFFSET_ERR |  Offset Failure |   
|  2 |  102 |  GAIN_ERR | Gain Failure  |   
|  ... |   |   |   |   
|  20 |  200 |  ACQ_NO |  No Acquisition  |   
|   |  201 |  ACQ_INCOMP | Incomplete Acquisition  |   
|   |  202 | ACQ_BADDATA  | Bad data coming from DCB (encoder count,…)  |   
|   |  203 | ACQ_CHOCK  |  Acquisition Buffer Full (No Connection) |   
|  ... |   |   |   |   
|  30 |  300 |  HV_NRDY | HVPS On but Not Ready  |   
|   |   301 | HV_OFF  |  Cannot Turn HV On |  
|   |   302 | HEX_OFF  |  Cannot Turn Heat Exchanger On |
|   |   303 |  XIL |  Interlock Open |
|   |   304 |  ESTOP |  ESTOP pushed |
|  ... |   |   |   |   
|  40 |  400 | TUBE_ARC  |  Tube Arcing |   
|   |  402 |  TUBE_MA_OVERLD |  MA Overload |   
|   |  403 |  TUBE_KV_OVERLD | KV Overload  |   
|   |  404 |  TUBE_FIL_OFF |  Filament Off |   
|   |  405 |  TUBE_FIL_OVERLD |  Filament Overload |   
|   |  406 |  TUBE_MA_DEV |  MA monitor below/above limit |   
|   |  407 |  TUBE_KV_DEV |  KV monitor below/above limit |   
|   |  408 |  TUBE_MA_MIS |  MA Reference Mismatch |   
|   |  409 |  TUBE_KV_MIS | KV Reference Mismatch  |   
|  ... |   |   |   |   
|  50 |  500 | SERVO_OVERSP  | Over Speed |   
|   |  501 |  SERVO_OVERCUR | Over Current  |   
|  ... |   |   |   |   
|  60 |  600 |  MC_POSF |  Position Following Error Band |   
|   |  601 |  MC_INVG |  Invalid Gain Set |   
|   |  602 | MC_STALL  |  Axis Stall Detected |   
|  ... |   |   |   |   

### **15.10	USER TYPE**
The USER_TYPE_TAB holds the various levels or group for the system’s users. Each level comes with specific permissions that allows or denies access to view, control, administer and configure the various components of the system.

#### **15.10.1	USER_TYPE_TAB Schema**
|  FIELDS |  DATA TYPE |  DESCRIPTION |  SOURCE |   
|---|---|---|---|
|  INDEX |  INTEGER |  Index of user type (Primary Key) |  Database configuration file  |   
|  TYPE |  CHAR [24] |  Corresponding text (human readable) |  Database configuration file  |   
|  PERMISSION |  BYTE [2] | Permission setup for this type  |  Database configuration file  |   
|  DESCRIPTION |  VARCHAR [120] |  User type description: describes what the user is able to do. |  Database configuration file  |   

#### **15.10.2	Example of USER_TYPE_TAB**
|  INDEX |  TYPE |  PERMISSION |  DESCRIPTION |   
|---|---|---|---|
|  0 |  GUEST |  00 |  Guest: View Only |   
|  1 |  OPERATOR |  03 |  Operator: TRI and PTRI Login |   
|  2 |  SUPERVISOR |  07 |  Supervisor: TRI, PTRI some SCI functionalities |   
|  3 |  MANAGER |  0F |  Manager: TRI, PTRI All SCI functionalities except Mux Administration | 
|  4 |  ADMINISTRATOR |  1F | All Permissions  |   
|  5 |  GE_STAFF |  3F |  All Permissions + GE Diagnostic and Calibration Tools  |

### **15.11	APPLICATION STATUS**
As for machine, each application goes through different states that can be found in the APP_STATUS_TAB. From a system point of view, most applications need only to inform if they are running or not. In case of error or fault, the software application is restarted or the computer on which it runs power-cycled. The root of the error does not need to be reported to the system but will be analyzed using log files later on.

#### **15.11.1	APP_STATUS_TAB Schema**
|  FIELDS |  DATA TYPE  |  DESCRIPTION |  SOURCE |   
|---|---|---|---|
|  INDEX |  INTEGER |  Index of application status (Primary Key) |  Database configuration file  |   
|  STATUS |  CHAR [24] |  Corresponding text (human readable) |  Database configuration file  |   
|  DESCRIPTION | VARCHAR [120]  |  Application status description: describes mostly if the application is healthy or not |  Database configuration file  |   

#### **15.11.2	Application Status Diagram**
![alt text](https://raw.githubusercontent.com/StephenWang123/Purple_Snail/master/15.PNG "Logo Title Text 1")

#### **15.11.3	Example of APP_STATUS_TAB**
|  INDEX |  STATUS |  DESCRIPTION |      
|---|---|---|
|  0 |  OFF | Application is not yet ready (default at startup)  |      
|  1 |  READY | Application is Ready (Idle)  |     
|  2 |  BUSY |  Application is Busy (Processing) |     
|  3 |  ERROR | Application Self Detect Error  |      
|  4 |  FAULT |  Application has been ruled as not running by the SCI because interval between heartbeats is greater that the maximum interval allowed for this application |     
|  5 |  LOGGED_ON |  TRI and PTRI Only (Busy) |   
|  6 |  LOGGED_OFF |  TRI and PTRI Only (Ready) |    
|  ... |   |   |    

### **15.12	APPLICATION TYPE**
The APP_TYPE_TAB holds the definition of the applications authorized to run on the system. An application belongs to a subsystem group and could eventually be dependent from another application. Dependencies could come from certifications (inspection/reconstruction for example) or software compatibilities. 

#### **15.12.1	APP_TYPE_TAB Schema**
|  FIELDS | DATA TYPE  | DESCRIPTION  |  SOURCE |   
|---|---|---|---|
|  INDEX |  INTEGER |  Index of application type (Primary Key) | Database configuration file   |   
|  TYPE |  CHAR [24] | Corresponding text (human readable)  | Database configuration file   |   
|  SUBSYSTEM |  CHAR [24] | Subsystem group in which the application belongs  |  Database configuration file  |   
|  DEPEND_ON | INTEGER  | Index of an application in which the application depends on.  |  Database configuration file  |   
|  MAX_HB |  INTEGER | Maximum number of seconds allowed between heartbeats before the application is ruled as not running (application fault state). Not all applications residing in the machine need to report heartbeat (null value allowed).  |  Database configuration file  |   
|  DESCRIPTION |  VARCHAR [120] |  Application description: describes certification status and dependencies. |  Database configuration file  |  

#### **15.12.2	Example of APP_TYPE_TAB**
| INDEX  | TYPE  |  SUBSYSTEM | DEPEND_ON  | MAX_HB  | DESCRIPTION  |
|---|---|---|---|---|---|
|  1 |  EV100 | INSPECTION  |  4 | 4  | Everest 100 Inspection depends on Recon V1 (certification) with a max interval of 4sec between heartbeats.  |
|  2 |  EV75 | INSPECTION  | 5  |  6 | Everest 75 Inspection depends on Recon V2 (certification) with a max interval of 6sec between heartbeats.  |
|  3 |  KOM | INSPECTION  | 4  |  10 |  ISA Inspection |
|  4 |  RECON_V1 | RECON  |  0 |  5 |  Recon V1 |
|  5 |  RECON_V2 | RECON  | 0  | 5  |  Recon V2 |
|  6 |  IQ_V1 | IQ_TEST  | 4  |  10 | IQ Test V1  |
|  7 |  IQ_V2 | IQ_TEST  |  5 |  10 |  IQ Test V2 |
|  8 |  MC | MACH_CONTROL  | 0  |  0 |  Machine Control. No heartbeat (done by SM) |
|  9 |  ACQ | ACQUISITION  | 8  | 0  |  Acquisition depends on Machine Control. No heartbeat (done by SM) |
|  10 |  TRI | TRI  | 4  | 2  |  Active TRI Application |
|  11 |  PTRI | PTRI  |  0 |  2 |  Passive TRI Application |
|  12 |  BCA |  BAG_CLEANUP | 0  | 120  |  Bag Cleanup Application |
|  13 | AI  | AIRPORT_INTERF  | 0  | 60  |  Airport Interface |
|  14 | SM  |  SYSTEM_MONITOR | 8  |  5 |  System Monitor depends on Machine Control. SM reports machine’s heartbeat. |
|  15 |  SCI |  SUPERVISOR_CONTROL_INTERFACE | 0  |  0 | SCI does not report heartbeat  |
|  ... |   |   |   |   |   |

## **16.	Administrative Tables**
The administrative tables are created from Mux configuration files (DB, Machines, Hosts, Applications, Users) or by the Mux System Administrator through the Supervisor Control Interface. The SCI shall provide an interface allowing backup/restore of the administrative table to/from the Mux configuration files.

### **16.1	BAG ADMINISTRATION**
The BAG_ADMIN_TAB holds information on where the image data and eventually raw data are stored on the data center. The storage path has a UNIX and Windows version depending on which OS/platform is accessing the path but it must point to the same location. To ensure uniqueness of bag across multiple databases, each database is identified by a unique number, which is used to generate a Global Unique Identifier for a bag. 

#### **16.1.1	BAG_ADMIN_TAB Schema**
|  FIELDS | DATA TYPE  |  DESCRIPTION |  SOURCE |   
|---|---|---|---|
|  BAG_DB_ID |  BYTE |  Identify the Data Center on which bags are stored with a unique number. Use to create a unique Bag Key across multiple Databases. For each TIP volume a unique number is also created  | DB Configuration or Administrator  |   
|  BAG_DB_IPS (TBD) |  INETD [3] |  If needed: static IP addresses of the servers running the database (primary, secondary, virtual?). | DB Configuration or Administrator  |   
|  BAG_PATH_PFIX_UNIX |  CHAR [120] | Prefix Path to the image bag folder on the data store for Unix Platform  | DB Configuration or Administrator  |   
|  BAG_PATH_PFIX_WIN |  CHAR [120] | Prefix Path to the image bag folder on the data store for Windows Platform  |  DB Configuration or Administrator |   
|  BAG_RPATH_PFIX_UNIX | CHAR [120]  | Prefix Path to the raw bag folder on the data store for Unix Platform  |  DB Configuration or Administrator |   
|  BAG_RPATH_PFIX_WIN | CHAR [120]  | Prefix Path to the raw bag folder on the data store for Windows Platform  |  DB Configuration or Administrator |   
|  ... |   |   |   |   

#### **16.1.2	Example of BAG_ADMIN_TAB**
The following is an example of a record holding information for bags registered with database number #1, which can be accessed by using the virtual IP @ 10.2.3.100 or primary server @ 10.2.3.101 or secondary server @ 10.2.3.102 (TBD). All bag folders are found under the bag directory, with subdirectories image or raw. To get the directory size reasonable, another layer of 31 subdirectories (one per day) could eventually be added (new field required TBD).  
The following records hold information for TIP bags belonging to volume 1 and 2.
|  BAG_DB_ID |  BAG_DB_IPS |  BAG_PATH_PFIX_UNIX | BAG_PATH_PFIX_WIN  | BAG_RPATH_PFIX_UNIX  | BAG_RPATH_PFIX_WIN  |
|---|---|---|---|---|---|
|  1 |  10.2.3.100 10.2.3.101 10.2.3.102 |  /net/10.2.3.100/bag/image/ | \net\10.2.3.100\bag\image\  |  /net/10.2.3.100/bag/raw/ |  \net\10.2.3.100\bag\raw\ |
|  2 |  10.2.3.100 10.2.3.101 10.2.3.102 |  /net/10.2.3.100/tip/vol1 |  \net\10.2.3.100\tip\vol1 |   |   |
|  3 |  10.2.3.100 10.2.3.101 10.2.3.102 |  /net/10.2.3.100/tip/vol2 | \net\10.2.3.100\tip\vol2  |   |   |

### **16.2	MACHINE ADMINISTRATION**
The MACH_ADMIN_TAB holds information on which machine is, was or will be connected to the data center.

#### **16.2.1	MACH_ADMIN_TAB Schema**
| FIELDS  |  DATA TYPE |  DESCRIPTION |  SOURCE |   
|---|---|---|---|
|  MACH_ID |  INTEGER |  DB Unique Machine ID (Primary key) | Record Creation  |   
|  MACH_NAME |  CHAR [16] |  Machine’s Name |  Machines Configuration or Administrator |   
|  MACH_ALIAS |  CHAR [24] |  Alias Name for the Machine |  Machines Configuration or Administrator |   
|  MACH_TYPE |  INTEGER |  Index in MACH_TYPE_TAB |  Machines Configuration or Administrator |   
|  MACH_LOCATION |  TEXT |  Physical location of the machine |  Machines Configuration or Administrator | 
|  MACH_INSTALL |  INTEGER |  Indicates if the machine is operational or not, going to be installed in the future... Index in INSTALL_TAB. Record can be removed when decommissioned and all references are gone. |  Machines Configuration or Administrator |   
|  MACH_MEMBERSHIP (TBD) |  INETD |  Data Center IP to which the machine belongs. This is a placeholder to capture eventually machine’s membership to a Data Centers. Note only one membership authorized per machine. | Machines Configuration or Administrator  | 
|  ... |   |   |   |   

#### **16.2.2	Example of MACH_ADMIN_TAB**
In the following example, 2 operational CTX-9800 and 1 decommissioned CTX-2500 are registered with the database.

| MACH_ID  | MACH_NAME  | MACH_ALIAS  | MACH_TYPE  | MACH_LOCATION  | MACH_INSTALL  | MACH_MEMBERSHIP  |
|---|---|---|---|---|---|---|
| ...  |   |   |   |   |   |   |
| 22  | G101  | Cougar  | 0  | Terminal 1  | 0  |  10.2.3.100 |
| 3  | M205  | Spider  | 3  | Lobby  | 2  |  10.2.3.100 |
| 20  |  G123 | Tiger  | 0  | Terminal 1  | 0  |  10.2.3.100 |
| ...  |   |   |   |   |   |   |

### **16.3	HOST/COMPUTER ADMINISTRATION**
The HOST_ADMIN_TAB holds information on which computer is, was or will be connected to the data center.
#### **16.3.1	HOST_ADMIN_TAB Schema**
|  FIELDS |  DATA TYPE |  DESCRIPTION |  SOURCE |   
|---|---|---|---|
|  HOST_ID |  INTEGER |  DB Unique Host ID (Primary key) |  Record Creation |   
|  HOST_NAME |  CHAR [24] |  Host/computer Name |  Hosts Configuration or Administrator |   
|  HOST_IP |  INETD |  Static IP Address (if any) Identifying the Host with the Data Center. | Hosts Configuration or Administrator  |   
|  HOST_LOCATION |  TEXT | Physical host location  |  Hosts Configuration or Administrator |   
|  HOST_INSTALL |  INTEGER |  Indicates if the computer is operational or not, going to be installed in the future... Index in INSTALL_TAB. Record can be removed when decommissioned and all references are gone. |  Hosts Configuration or Administrator |   
|  MACH_ID |  INTEGER |  For host belonging to a machine. Index in MACH_ADMIN_TAB (null value allowed) |  Hosts Configuration or Administrator |   
|  HOST_MEMBERSHIPS (TBD) |  INETD [10] |  List of Data Center IP to which the host belongs. This is a placeholder capture eventually host membership to multiple Data Centers.  |  Hosts Configuration or Administrator |   
|  ... |   |   |   |   

#### **16.3.2	Example of HOST_ADMIN_TAB**
In the following example, 4 hosts/computers (PC1, SERV1, PC80, PC34) are registered with the database and operational.
|  HOST_ID |  HOST_NAME |  HOST_IP |  HOST_LOCATION |  HOST_INSTALL |  MACH_ID |  HOST_MEMBERSHIPS |
|---|---|---|---|---|---|---|
|  ... |   |   |   |   |   |   |
|  12 |  PC1 |  10.2.3.210 |  Control Room 1 |  0 |  0 |  10.2.3.100 |
|  13 |  SERV1 |  10.2.3.299 |  Server Room 1 |  0 | 0  |  10.2.3.100 |
|  14 |  PC80 |  10.2.3.380 |  Server Room 1 |  0 |  0 |  10.2.3.100 |
|  20 |  PC34 |  10.2.3.101 |  MC-G101 |  0 |  22 |  10.2.3.100 |
|  ... |   |   |   |   |   |   |

### **16.4	APPLICATION ADMINISTRATION**
The APP_ADMIN_TAB holds information on which software application is allowed to participate in the system. The application’s name is generated from the host name on which the application is running, the type and application’s instance number. The time out for the application defines the maximum number of seconds that the application has for processing a bag. For TRI application the time out is the Guaranteed Operator View Time or GOVT. When an application is retired, its activity flag is modified but the record stays in the table as long as it is referenced by other records (APP_DEC_TAB, APP_STATE_TAB, BAG_TAB).

#### **16.4.1	APP_ADMIN_TAB Schema**
|  FIELDS | DATA TYPE  | DESCRIPTION  |  SOURCE |   
|---|---|---|---|
|  APP_ID | INTEGER | DB Unique Application ID (Primary key)  | Record Creation  |   
|  APP_NAME | CHAR [24]  | Full Name of Application. The full name is formed from HOST, TYPE and NUM fields (PC1_EV100_001)  |  Applications Configuration or Administrator |   
|  APP_ALIAS | CHAR [24]  | Alias name for the application (i14.3.2…)  |   Applications Configuration or Administrator|  
|  APP_HOST_ID | INTEGER  | Host Name on which the Application is running (PC1…) Index in HOST_ADMIN_TAB |  Applications Configuration or Administrator |   
|  APP_TYPE | INTEGER  | Type of Application (EV100). Index in APP_TYPE_TAB  |  Applications Configuration or Administrator |   
|  APP_NUM | INTEGER  | Instance Number of the Application.  |  Applications Configuration or Administrator |  
|  APP_TIMEOUT | INTEGER  | Maximum number of seconds allocated to this application for processing a bag. For TRI it is the GOVT.|  Applications Configuration or Administrator |   
|  APP_ACTIVE | BOOL  | Application is still Active (Yes/No). Record can be removed when the application is inactive and all references are gone.  |  Applications Configuration or Administrator |   
|  ... |   |   |   |  

#### **16.4.2	Example of APP_ADMIN_TAB**
In the following example, 4 active applications are registered with the database: EV100 inspection instance #6 running on host PC80 with a maximum processing time of 10 seconds, Recon instance #2 running on SERV1 with a max of 20 seconds, TRI instance #15 running on PC1 with a GOVT of 60 seconds and Acquisition running on PC34 computer.

|  APP_ID |  APP_NAME |  APP_ALIAS |  APP_HOST_ID |  APP_TYPE | APP_NUM  |  APP_TIMEOUT |  APP_ACTIVE |
|---|---|---|---|---|---|---|---|
|  ... |   |   |   |   |   |   |   |
|  71 |  PC80_EV100_06 |  14.3.2 |  14 |  1 |  6 |  10 |  Yes |
|  8 |  SERV1_RECON_02 |  6.2.0 |  13 |  4 |  2 |  20 |  Yes |
|  45 |  PC1_TRI_15 | 3.2.2  |  12 |  10 |  15 |  60 |  Yes |
|  4 |  PC34_SC_101 |  1.1.0 |  20 |  9 |  0 |  0 |  Yes |
|  ... |   |   |   |   |   |   |   |

### **16.5	USER ADMINISTRATION**
The USER_ADMIN_TAB holds credential information on who is able to logon to the various user interfaces of the system. Each user belongs to a level/type that allows specific permissions. When a user is dismissed, its activity flag is modified but the record stays in the table as long as it is referenced by other records (APP_DEC_TAB, APP_STATE_TAB).

#### **16.5.1	USER_ADMIN_TAB Schema**
|  FIELDS |  DATA TYPE |  DESCRIPTION |  SOURCE |   
|---|---|---|---|
|  USER_ID | INTEGER  | DB Unique User ID (Primary key)  | Record Creation  |   
|  USER_NAME | CHAR [16]  |  User’s Name | Users Configuration or Administrator or Manager or Supervisor   |   
|  USER_TYPE | INTEGER  | User’s Access Level. Index in USER_TYPE_TAB.  | Users Configuration or Administrator or Manager or Supervisor   |   
|  USER_PWD | INTEGER  | Encrypted Password for the User  | Users Configuration or Administrator or Manager or Supervisor   |   
|  USER_ACTIVE | BOOL  | User is still active (Yes /No). Record can be removed when a user is inactive and all references are gone.  | Users Configuration or Administrator or Manager or Supervisor   |   
|  ... |   |   |   |   

#### **16.5.2	Example of USER_ADMIN_TAB**
In the following example, 3 users are registered with the database: Joe is active and is part of GE_STAFF, Admin is an active Administrator while Jack is a simple operator who has been deactivated.

|  USER_ID |  USER_NAME |  USER_TYPE |  USER_PWD |  USER_ACTIVE |
|---|---|---|---|---|
| ...  |   |   |   |   |
| 12  | Joe  | 5  |  @#12%^$^ | Yes  |
| 13  | Jack  | 1  | *44&)8*  | No  |
| 14  | Admin  | 4  |  @#$22113 | Yes  |
| ...  |   |   |   |   |

## **17.	Dynamic Tables**
### **17.1	BAG MANAGEMENT**
The BAG_TAB holds information for at least 48 hours for all bags that have been registered with the data center.

When a bag is loaded into a machine (9800, 9400, XRD…) belonging to the system (referenced by a record in MACH_ADMIN_TAB), a new bag event triggers the creation of bag record in the BAG_TAB and in the bag-machine specific table (BAG_CTX9800_TAB, BAG_CTX9400_TAB, BAG_XRD_TAB… see below).

A bag is identified by the machine (MACH_ID), its ID (BAG_ID) and/or its tracking number (BAG_TRACK_NUM). Uniqueness of ID and tracking number is not guaranteed and duplicates are possible (for example, the same bag can be scanned with a 9800 and XRD or twice by the same machine). For each new bag event a unique identifier (BAG_KEY) is generated and can be used to reference the bag across data centers. The BAG_KEY generation uses the database number (BAG_DB_ID from BAG_ADMIN_TAB) to guarantee its uniqueness across multiple databases. 

Each time a bag enters a machine 2 records (BAG_TAB and bag-machine specific table) must be inserted no matter if an existing record with the same (MACH_ID, BAG_ID, BAG_TRACK_NUM) already exist. In case a bag is scanned n times with the same id but a different tracking number (or vice versa), n*2 records will be inserted. If several records match the bag id or the tracking number, bag records reconciliation will need to be performed. Third party applications communicating through the Airport Interface use the bag id and/or the tracking number to access bag information. 

The status of a bag follows sequential steps; each step allows or blocks actions from specific subsystems and translates in a set of rules. If the rule of a subsystem allows it to process a bag, it locks the record by promoting the bag status (BAG_STATUS), updates its reference (APP_ID) and the time the lock has been performed (APP_START_TIME). As a consequence it prevents concurrent subsystems to access the record but allow recovery of bags locked for too long (APP_TIMEOUT in the APP_ADMIN_TAB). When the subsystem finishes processing the bag, it promotes the status, which unlocks the record and makes it available for the next subsystem with the appropriate rule. In case of a fault or error, the BAG_ERROR will reference the corresponding error. 

When the overall decision is rendered, the subsystem in charge (it depends on configuration modes) updates the bag decision (BAG_DECISION) and the bag status (BAG_STATUS) to DONE.

#### **17.1.1	BAG_TAB Schema**
|  FIELDS |  DATA TYPE |  DESCRIPTION |  UPDATE |  SOURCE |
|---|---|---|---|---|
|  BAG_KEY |  INTEGER | Global Unique Identifier (GUID). It is the bag Key unique across databases generated at record creation   | Record creation on new bag event  | GUID as Primary Key  |
|  BAG_DB_ID | BYTE  | Identify the DB number in which the bag belongs. Bag folder paths are deduced from this number.  | Record creation  |  First byte in primary key. BAG_ADMIN_TAB |
|  MACH_ID | INTEGER  | Machine ID. Index in MACH_ADMIN_TAB.   | CTX-MC/XRD/AT  | MACH_ADMIN_TAB  |
|  BAG_ID | CHAR [16]  | Bag Identification Number. Self-Generated, or IATA Type.  |  CTX-MC/XRD/AT  | CTX-MC/XRX/AT (Self-Generated) or AI_BHS (IATA).   |
|  BAG_TRACK_NUM | CHAR [24]  | BHS Tracking Number  | CTX-MC/XRD/AT  |  AI-BHS |
|  BAG_STATUS | INTEGER  | Bag Status given by Subsystems to Lock/Unlock the bag. Index in BAG_STATUS_TAB | CTX-MC/XRD/AT, RECON, INSP, TRI, PTRI  | BAG_STATUS_TAB  |
|  BAG_ERROR | INTEGER  |  Error Index in case of bag Fault or Error status. Index in BAG_ERROR_TAB | CTX-MC/XRD/AT, RECON, INSP, TRI, PTRI  |  BAG_STATUS_TAB |
|  BAG_DECISION |  INTEGER | Overall decision for the bag. Index in DECISION_TAB | INSP or IQ or TRI or PTRI  | DECISION_TAB  |
|  APP_ID | INTEGER  | Current Application ID that last Locked the Bag. Index in APP_ADMIN_TAB (null value allowed)  | CTX-MC/XRD/AT, RECON, INSP TRI, PTRI  | APP_ADMIN_TAB  |
|  APP_START_TIME |  DATETIME | Date and Time (mm-dd-yy hh:mm:ss) when the bag has been locked by the current application. Use the Application time out and start time to detect orphan/stuck bag (null value allowed)  |  CTX-MC/XRD/AT, RECON, INSP TRI, PTRI | DB Clock  |

#### **17.1.2	Example of BAG_TAB**
In the following example, 3 bags are registered with the database. 

Bag #12356 has IATA34 for bag id and T1769 tracking number. The bag has been through G101 and being currently inspected (since 7:33:16) by instance #6 of an EV100 inspection running on PC80.

Bag #12357 has IATA99 for bag id and T1230 tracking number. The bag is in fault and no decision can be expected. Apparently, there was no acquisition running on PC34 when the bag went through G101. 

Bag #14567 has IATA07 for bag id and no tracking number. The bag has been scanned by G123 and went thru on screen resolution with a final Clear decision.

| BAG_KEY  | BAG_DB_ID  |  MACH_ID |  BAG_ID |  BAG_TRACK_NUM |  BAG_STATUS | BAG_ERROR | BAG_DECISION | APP_ID  | APP_START_TIME |
|---|---|---|---|---|---|---|---|---|---|
|  ... |   |   |   |   |   |   |   |   |   |   
|  12356 |  1 |  22 |  IATA34 |  T1769 |  5 |  0 |  0 |  71 |  11-12-06 07:33:16 |   
|  12357 |  1 |  22 |  IATA99 |  T1230 |  11 | 100  |  1 |  4 | 11-12-06 07:32:11  |   
|  14567 |  1 |  20 |  IATA07 |  0 |  8 |  0 |  2 |  0 | 0  |   
|  ... |   |   |   |   |   |   |   |   |   |   

### **17.2	BAG MANAGEMENT CTX-9800 SPECIFIC**
The BAG_CTX9800_TAB holds information for at least 48 hours for all bags that have been loaded into a CTX9800 machine belonging to the system.

When a bag is loaded into a CTX9800 and acknowledged by the machine control subsystem, a new bag event triggers the creation of a record in the BAG_TAB and a record in the BAG_CTX9800_TAB. The same BAG_KEY is used as unique identifier for the bag. 

Each record in the table holds the various modes, time out and expected inspection or IQ test, setup for the CTX9800 or by the Airport Interface at the time the bag was loaded into the CTX. To track the time spent into the machine the load and unload time are updated appropriately. For BMTT backward compatibility, the bag unload time (UNLOAD_TIME) is used in concordance with the timeout value (TIMEOUT) to detect BMTT expiration.

When the bag data is ready (after acquisition or reconstruction), the bag folder is updated (raw or image) and the data is stored under the folder. The folder path is found in the BAG_ADMIN_TAB.
In the future, the abort on screen resolution flag could be used in place of BMTT.

#### **17.2.1	BAG_CTX9800_TAB Schema**
| FIELDS  | DATA TYPE  | DESCRIPTION  | UPDATE  | SOURCE  |
|---|---|---|---|---|
| BAG_KEY  | INTEGER  | Global Unique Identifier for the bag  | Record creation on new bag event  | BAG_TAB  |
| INSP_TYPE  | INTEGER  | Inspection or Image Quality Type.  Index in APP_TYPE_TAB  | MC  | MACH_STATE_CTX_TAB or AI-BHS  |
| SHOW_MODE  | BOOL  | Show Mode On/Alarm or Off /All).  | MC  | MACH_STATE_CTX_TAB or AI-BHS  |
| DEC_MODE  | BOOL  | Auto Decision Mode On or Off  | MC  | MACH_STATE_CTX_TAB or AI-BHS  |
| DS_MODE  | BOOL  | Dynamic Switching Mode On or Off  | MC  | MACH_STATE_CTX_TAB or AI-BHS  |
| DC_MODE  | BOOL  | Data Collection Mode On or Off  | MC  | MACH_STATE_CTX_TAB  |
| SC_MODE  | BOOL  | SELECTEE Mode On or Off  | MC  | AI-BHS  |
| TIMEOUT  | INTEGER  | Bag Maximum Travel Time (BMTT)  | MC  | MACH_STATE_CTX_TAB or AI-BHS  |
| LOAD_TIME  | DATETIME  | Load Bag Time (mm-dd-yy hh:mm:ss creation time of the record)  | MC  |   MC  |
| UNLOAD_TIME  | DATETIME  |  Unload Bag Time (mm-dd-yy hh:mm:ss) used for BMTT | MC  | MC  |
| FOLDER_NAME  | CHAR [120]  |  Image Bag Folder Name on the data store. Something like: MACHNAME.BAGID.TRACKNUM.MMDDYYHHMNSS (null value allowed) | RECON  | BAG_TAB and BAG_CTX_TAB  |
| RAWFOLDER_NAME  | CHAR [120]  | Bag folder name for raw data (null value allowed)  | ACQ  |  BAG_TAB and BAG_CTX_TAB |
| ABORT_OSR  | BOOL  | Abort On Screen Resolution. Flag for TRI for future use (Alternative to BMTT)  |  AI |  AI |

#### **17.2.2	Example of BAG_CTX9800_TAB**
In the following example, the data for bag #12356 can be found under the folder \bag\image\G101.IATA34.T1769.111206072015. Bag #12357 has no data because in fault. Bag #14567 has a complete set of data under the folder \bag\image\G123.IATA07.45673A.111206071016.

| BAG_KEY  | INSP_TYPE  | SHOW_MODE  | DEC_MODE  | DS_MODE  | DC_MODE  | SC_MODE  | TIMEOUT  | LOAD_TIME  | UNLOAD_TIME  | FOLDER_NAME  |
|---|---|---|---|---|---|---|---|---|---|---|
| ...  |   |   |   |   |   |   |   |   |   |   |
| 12356  | 1  | Off  | Off  | Off  | Off  | Off  | 60  | 11-12-06 07:20:03  | 11-12-06 07:20:18  | G101.IATA34.T1769.11206072015  |
| 12357  | 2  | Off | Off  | Off  | Off  | Off  | 60  | 11-12-06 07:20:23  |  11-12-06 07:32:11 |  0 |
| 14567  | 1  | On  | On  | Off  |  Off | Off  | 30  | 11-12-06 07:10:12  | 11-12-06 07:10:23  | G123.IATA07.45673A.111206071016  |
| ...  |   |   |   |   |   |   |   |   |   |   |

### **17.3	BAG MANAGEMENT CTX-9400 SPECIFIC (TBD)**
The BAG_CTX9400_TAB holds information for at least 48 hours for all bags that have been loaded into a CTX9400 machine belonging to the system.
| FIELDS  | DATA TYPE   | DESCRIPTION  | UPDATE  | SOURCE  |
|---|---|---|---|---|
| BAG_KEY  | INTEGER  | Global Unique Identifier for the bag  | Record creation on new bag event  | BAG_TAB  |
| PSX_TYPE  | INTEGER  | Scan projection type  | MC  | Machine configuration  |
| HI_MODE  | BOOL  | Hold Inside Mode On or Off).  | MC  | MACH_STATE_CTX_TAB or AI-BHS  |
| …  |   |   |   |   |

### **17.4	BAG MANAGEMENT XRD SPECIFIC (TBD)**
The BAG_XRD_TAB holds information for at least 48 hours for all bags that have been loaded into a XRD machine belonging to the system.

### **17.5	APPLICATION DECISION**
The APP_DEC_TAB holds all decisions given to a bag by authorized subsystems (inspection, TRI/PTRI, XRD-inspection…). When a subsystem is ready to render a decision for a bag referenced by BAG_KEY (new decision event) it inserts a new record in the table specifying the decision, start end time, the type of application and a reference to the application or the user rendering the decision. 

#### **17.5.1	APP_DEC_TAB Schema**
| FIELDS  |  	DATA TYPE  | DESCRIPTION  | UPDATE  | SOURCE  |
|---|---|---|---|---|
| BAG_KEY  | INTEGER  | Global Unique Identifier for the bag  | Record creation on new decision event  |  BAG_TAB |
| APP_DEC  | INTEGER  | Application Decision for the bag. Index in DECISION_TAB | INSP, IQ, TRI, PTRI, XRD, AT  | DECISION_TAB  |
| APP_ID  | INTEGER  | Application ID (Inspection, IQ, TRI…) giving the decision.  Index in APP_ADMIN_TYPE  | INSP, IQ, TRI, XRD, AT  | APP_ADMIN_TAB  |
| USER_ID  | INTEGER  | If Decision from operator, it’s user ID. Index in USER_ADMIN_TYPE (null value allowed)| TRI, PTRI  | USER_ADMIN_TAB  |
| APP_START_TIME  | DATETIME  | Start Application Time (mm-dd-yy hh:mm:ss)  | INSP, IQ, TRI, PTRI, XRD, AT  | DB Clock  |
| APP_END_TIME  | DATETIME  | End Application Time (mm-dd-yy hh:mm:ss)  | INSP, IQ, TRI, PTRI, XRD, AT  | DB Clock  |

#### **17.5.2	Example of APP_DEC_TAB**
In the following example, bag #14567 has been given a Suspect decision at 07:10:13 by the EV100 inspection running on PC80 but has been cleared by operator Jack from the TRI running on PC1 at 07:11:45. Since then, Jack has been deactivated.
|  BAG_KEY |  APP_DEC |  APP_ID |  USER_ID | APP_START_TIME  |  APP_END_TIME |
|---|---|---|---|---|---|
| ...  |   |   |   |   |   |
| 14567  | 1  | 71  | 0  | 11-12-06 07:10:09  | 11-12-06 07:10:13  |
| 14567  | 2  | 45  | 13  | 11-12-06 07:10:34  | 11-12-06 07:11:45  |

### **17.6	APPLICATION STATE**
The APP_STATE_TAB holds heartbeat and status information for all applications running on the system. When an application starts it checks first in the APP_ADMIN_TAB for permissions (APP_NAME, APP_ACTIVE) and for an existing record in APP_STATE_TAB. If necessary, a new record is inserted. During its execution, the application updates its status (APP_STATUS) and heartbeat (APP_HB), which are monitored by the SCI. A hung application is detected when the heartbeat is older than the maximum number of seconds allowed (APP_MAX_HB). Applications that allow a user to log in must update the user ID (APP_USER_ID).

#### **17.6.1	APP_STATE_TAB Schema**
| FIELDS  | DATA TYPE  | DESCRIPTION  | UPDATE  | SOURCE  |
|---|---|---|---|---|
| APP_ID  | INTEGER  | Application ID. Index in APP_ADMIN_TAB  | Record creation at application startup  | APP_ADMIN_TAB  |
| APP_MAX_HB  | INTEGER  | Maximum number of seconds between heartbeats before the application is seen as not running (the value is copied from APP_TYPE_TAB only to prevent excessive joins)  | Record creation  | APP_TYPE_TAB  |
| APP_HB  | DATETIME  | Last Heartbeat Time (mm-dd-yy hh:mm:ss). Use in concordance with MAX_HB to detect hung application.  | SM, RECON, INSP TRI, PTRI, AI  | DB Clock  |
| APP_STATUS  | INTEGER  | Application Status. Index in APP_STATUS_TAB  | SM, RECON, INSP TRI, PTRI, AI  | APP_STATUS_TAB  |
| APP_USER_ID  | INTEGER  | For User Interface Applications capture the current user logged on. Index in USER_ADMIN_TAB (null value allowed)  | TRI, PTRI, SCI  | USER_ADMIN_TAB  |

#### **17.6.2	Example of APP_STATE_TAB**
In the following snapshot example (7:15:15), EV100 inspection instance #6 running on host PC80 is busy with the last check-in at 7:15:12 still valid until 07:15:16. 

Recon instance #2 running on SERV1 is busy with the last check-in at 7:15:14 still valid until 07:15:19.  

TRI instance #15 running on PC1 has user Joe logged-on with the last check-in at 7:15:14 still valid until 07:15:16. 

Machine Control of G101 running on PC34 computer has been set in fault by SCI because the last check-in at 7:15:11 expired at 07:15:13. Therefore, the machine will need a software restart.

| APP_ID  | APP_MAX_HB  | APP_HB  | APP_STATUS  | APP_USER_ID  |
|---|---|---|---|---|
| ...  |   |   |   |   |
| 71  | 4  | 11.12.06 07:15:12  | 2  | 0  |
| 8  | 5  | 11.12.06 07:15:14  | 2  | 0  |
| 45  | 2  | 11.12.06 07:15:14  | 5  | 12  |
| 4  | 2  | 11.12.06 07:15:11  | 4  | 0  |
| ...  |   |   |   |   |

### **17.7	MACHINE CONTROL CTX SPECIFIC**
The MACH_CTRL_CTX_TAB holds the current control sent to machines by the SCI. Records are created at startup from the MACH_ADMIN_TAB on condition specify by MACH_INSTALL. Each time a new installation is made it triggers a new install event that insert a new record in the table. 

Each record holds the configuration modes, inspection type and commands passed by a user from the SCI to the machine. For backward compatibility, the machine timeout can be adjusted from the SCI.

#### **17.7.1	MACH_CTRL_CTX_TAB Schema**
| FIELDS  | DATA TYPE  | DESCRIPTION  | UPDATE  | SOURCE  |
|---|---|---|---|---|
| MACH_ID  | INTEGER  | Machine ID. Index in MACH_ADMIN_TAB   | Record creation at DB Startup and new install event  | MACH_ADMIN_TAB  |
| MACH_CMD  | INTEGER  | Last Command passed to the Machine. Index in MACH_CMD_TAB  | SCI  | Supervisor  |
| MACH_INSP_TYPE  | INTEGER  | Inspection or Image Quality.  Index in APP_TYPE_TAB  | SCI  | Supervisor  |
| MACH_OPER_MODE  | INTEGER  | Operational Mode of the machine. Index in MACH_OPER_TAB  | SCI  | Manager  |
| MACH_ENTRY_MODE  | BOOL  | Entry Integrated On or Off  | SCI  | Manager  |
| MACH_EXIT_MODE  | BOOL  | Exit Integrated On or Off  |   | Manager  |
| MACH_SHOW_MODE  | BOOL  | Show Mode Alarm/On or All/Off  | SCI  | Supervisor  |
| MACH_DEC_MODE  | BOOL  | Auto Decision Mode On or Off  | SCI  | Supervisor  |
| MACH_DS_MODE  | BOOL  | Dynamic Switching Mode On or Off  | SCI  | Supervisor  |
| MACH_DC_MODE  | BOOL  | Data Collection Mode On or Off  | SCI  | GE Personal  |
| MACH_TIMEOUT  | INTEGER  | Maximum Travel Time for bags passing through the machine  | SCI  | Manager  |

#### **17.7.2	Example of MACH_CTRL_CTX_TAB**
In the following example, G101 is set for remote scanning with EV100 inspection and a BMTT of 30 seconds for all bags scanned by this machine. The machine is fully integrated with all other modes set to off by the Control Interface. The last command passed to the machine was a fault reset.
| MACH_ID  | MACH_CMD  | INSP_TYPE  | OPER_MODE  | ENTRY_MODE  | EXIT_MODE  | SHOW_MODE  | DEC_MODE  | DS_MODE  | DC_MODE  | TIMEOUT  |
|---|---|---|---|---|---|---|---|---|---|---|
| ...  |   |   |   |   |   |   |   |   |   |   |
| 22  | 3  | 1  | 0  | On  | On  | Off  | Off  | Off  | Off  | 30  |   
| ...  |   |   |   |   |   |   |   |   |   |   |

### **17.8	MACHINE STATE CTX SPECIFIC**
The MACH_STATE_CTX_TAB holds the current state of machines. Records are created at startup with records of MACH_CTRL_CTX_TAB from the MACH_ADMIN_TAB on condition specify by MACH_INSTALL. Each time a new installation is made it triggers a new install event that insert a new record in the table. 

Each record holds the configuration modes, inspection type, status and eventually error that the machine is currently set with. The machine timeout from the MACH_CTRL_CTX_TAB is used to assign a BMTT on a per bag basis. If Dynamic Switching mode is on then Show, mode Auto Decision mode and Inspection type could be provided by the Airport Interface through the Machine Control subsystem.

#### **17.8.1	MACH_STATE_CTX_TAB Schema**
| FIELDS  | DATA TYPE  | DESCRIPTION  | UPDATE  | SOURCE  |
|---|---|---|---|---|
| MACH_ID  | INTEGER  | Machine ID. Index in MACH_ADMIN_TAB   | Record creation at DB Startup and new install event  | MACH_ADMIN_TAB   |
| MACH_STATUS  | INTEGER  | Index in MACH_STATUS_TAB  | SM/MC  |  SM/MC  |
| MACH_ERROR  | INTEGER  | Error Index in case of machine Fault status. Index in MACH_ERROR_TAB  | SM/MC  | MACH_ERROR_TAB  |
| MACH_INSP_TYPE  | INTEGER  | Inspection or Image Quality Type.  Index in APP_TYPE_TAB  | SM/MC  | MACH_CTRL_CTX_TAB or Machine Configuration (Startup) or AI-BHS  |
| MACH_OPER_MODE  | INTEGER  | Operational Mode of the machine. Index in MACH_OPER_TAB  | SM  | MACH_CTRL_CTX_TAB or Machine Configuration (Startup)  |
| MACH_ENTRY_MODE  | BOOL  | Entry Integrated On or Off  | SM  | MACH_CTRL_CTX_TAB or Machine Configuration (Startup)  |
| MACH_EXIT_MODE  | BOOL  | Exit Integrated On or Off  | SM  | MACH_CTRL_CTX_TAB or Machine Configuration (Startup)  |
| MACH_SHOW_MODE  | BOOL  | Current Show Mode Alarm/On or All/Off  | SM/MC  | MACH_CTRL_CTX_TAB or Machine Configuration (Startup) or AI-BHS  |
| MACH_DEC_MODE  | BOOL  | Current Auto Decision Mode On or Off  | SM/MC  | MACH_CTRL_CTX_TAB or Machine Configuration (Startup) or AI-BHS  |
| MACH_DS_MODE  | BOOL  | Current Dynamic Switching Mode On or Off  | SM  | MACH_CTRL_CTX_TAB or Machine Configuration (Startup)  |
| MACH_DC_MODE  | BOOL  | Data Collection Mode On or Off  | SM  | MACH_CTRL_CTX_TAB or Machine Configuration (Startup)  |
| MACH_TIMEOUT  | INTEGER  | Maximum Travel Time for bags passing through the machine  | SM  | Manager  |

#### **17.8.2	Example of MACH_STATE_CTX_TAB**
In the following example, G101 is remotely controlled with EV100 inspection settings and a BMTT of 30 seconds for all bags scanned by this machine. The machine is currently fully integrated with all other modes set to off. The machine is now executing a reset due to the last command.
| MACH_ID  | MACH_STATUS| MACH_ERROR   | INSP_TYPE  | OPER_MODE  | ENTRY_MODE  | EXIT_MODE  | SHOW_MODE  | DEC_MODE  | DS_MODE  | DC_MODE  | TIMEOUT  |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ...  |   |   |   |   |   |   |   |   |   |   |    |
| 22  | 7  | 200  | 1  | 0  | On  | On  | Off  | Off  | Off  | Off  |  30  |
| ...  |   |   |   |   |   |   |   |   |   |   |    |

## **18.	FDR Tables**
The FDR tables and data contains in the tables are imposed by the TSA. One of TSA assumption is that the bag id shall not repeat within a one-year period, which at this time cannot be guaranteed by all airports. The global unique identifier for bag (BAG_KEY) shall be used instead. For historical reason the FDT tables are EDS Bag Viewing Station oriented and less generic than the tables above.

### **18.1	MACHINE BAG INFORMATION**
The FDR_MACH_BAG_TAB holds information for each scanned bag and each Threat Image Projection (TIP) bag. Most of the data pertinent to bag scanned can be found in existing tables but the field’s names could be different to be compliant with existing FDR terminology. Scanned bags are of two types: Image Quality (IQ) or Real (RE). TIP bags could also be of two types: False Alarm (FA) or Improvised Explosive Device (IED).

| FIELDS  | DATA_TYPE  | DESCRIPTION  |   
|---|---|---|
| BAG_KEY  | INTEGER  | Global Unique Identifier. Same as BAG_TAB.BAG_KEY for Non-TIP bag. TIP bags are assigned a unique key based on BAG_ADMIN_TAB when there are displayed.  |      
| BAG_ID  | CHAR [16]  | Identification number of the bag. For non TIP bag, same as BAG_TAB.BAG_ID  |      
| SECONDARY_BAG_ID  | CHAR [24]  | Secondary bag id. For non TIP bag, same as BAG_TAB.BAG_TRACK_NUM  |    
| MACH_NAME  | CHAR [16]  | Identification number of the EDS also called “machine id”. For BAG_KEY (non-TIP bag), same as (BAG_TAB.MACH_ID, MACH_ADMIN_TAB.MACH_NAME)  |      
| BAG_TYPE  | CHAR [2]  | Type of bag based on the following categories: FA (TIP), IED (TIP), IQ (Image Quality), RE (real). For BAG_KEY (non-TIP bag), deduced from BAG_CTX9800_TAB.INSP_TYPE  |      
| SW_VERSION  | CHAR [24]  | Not Applicable. Instead there is INSP_VERSION and RECON_VERSION  |      
| BAG_START_DATE_STAGE1  | DATE  | The date the bag entered the machine (mm-dd-yy) . For BAG_KEY (non-TIP bag), same as date extracted from BAG_CTX9800_TAB.LOAD_TIME  |      
| BAG_START_TIME_STAGE1  | TIME  | The time the bag entered the machine (hh:mn:ss). For BAG_KEY (non-TIP bag), same as time extracted from BAG_CTX9800_TAB.LOAD_TIME  |      
| BAG_START_DATE_STAGE2  | DATE  | Not Applicable  |    
| BAG_START_TIME_STAGE2  | TIME  | Not Applicable  |      
| INSP_VERSION  | CHAR [24]  | EDS inspection software identification. For BAG_KEY (non-TIP bag), same as (BAG_CTX9800_TAB.INSP_TYPE, APP_TYPE_TAB.APP_NAME)  |      
| RECON_VERSION  | CHAR [24]  | EDS reconstruction software identification. For BAG_KEY (non-TIP bag), same as (BAG_CTX9800_TAB.INSP_TYPE, APP_TYPE_TAB.DEPEND_ON)  |      
| MACH_DECISION  | INTEGER  | The decision “determined by the EDS”. For BAG_KEY (non-TIP bag), same as APP_DEC_TAB.APP_DEC when application is an inspection  |   
| MACH_NUM_THREATS  | INTEGER  | Number of threats identify by the EDS  |   
| MACH_NUM_SLICES  | INTEGER  | Not Applicable  |   

### **18.2	TRI BAG INFORMATION**
The FDR_TRI_BAG_TAB holds information for each scanned bag and each Threat Image Projection (TIP) bag viewed by a screener/operator.
| FIELDS  | DATA_TYPE  | DESCRIPTION  |   
|---|---|---|
| BAG_KEY  | INTEGER  | Global Unique Identifier.  |   
| TRI_NAME  | CHAR [24]  | Identification number of the EDS. For BAG_KEY (non-TIP bag), same as (APP_DEC_TAB.APP_ID, APP_ADMIN_TAB.APP_NAME) when application is a TRI  |      
| USER_NAME  | CHAR [16]  | Identification login of the operator. For BAG_KEY (non-TIP bag), same as (APP_DEC_TAB.USER_ID, USER_ADMIN_TAB.USER_NAME) when application is a TRI  |     
| USER_NUM_THREATS_VIEWED  | INTEGER  | Number of threats viewed by the operator  |      
| USER_NUM_KEYSTROKES  | INTEGER  | Number of keystrokes used by the operator to resolve the bag  |     
| USER_DECISION  | INTEGER  | The decision given by the operator. For BAG_KEY (non-TIP bag), same as APP_DEC_TAB.APP_DEC when application is a TRI  |      
| USER_BAG_START_DATE  | DATE  | The date the bag was displayed on the TRI (mm-dd-yy). For BAG_KEY (non-TIP bag), same as date extracted from APP_DEC_TAB.APP_START_TIME  |     
| USER_BAG_START_TIME  | TIME  | The time the bag was displayed on the TRI (hh:mn:ss). For BAG_KEY (non-TIP bag), same as time extracted from APP_DEC_TAB.APP_START_TIME  |      
| USER_BAG_END_DATE  | DATE  | The date the bag was removed from the TRI (mm-dd-yy). For BAG_KEY (non-TIP bag), same as date extracted from APP_DEC_TAB.APP_END_TIME  |     
| USER_BAG_END_TIME | TIME  | The time the bag was removed from the TRI (hh:mn:ss).. For BAG_KEY (non-TIP bag), same as time extracted from APP_DEC_TAB.APP_END_TIME  |      
| USER_NUM_SLICES  | INTEGER  | Not Applicable  |    

### **18.3	MACHINE EVENTS**
The FDR_MACH_EVENTS_TAB holds information for each machine event. In this case, an event is a changing status of a machine.
| FIELDS  | DATA_TYPE  | DESCRIPTION  |   
|---|---|---|
| EVENT_NAME  | CHAR [24]  | Event related to machine. From MACH_STATUS_TAB.STATUS  |      
| MACH_NAME  | CHAR [16]  | Identification number of the EDS. From MACH_ADMIN_TAB.MACH_NAME  |     
| EVENT_DATE  | DATE  | Date when the event occurred (mm-dd-yy)  |      
| EVENT_TIME  | TIME  | Time when the event occurred (hh:mn:ss)  |     
| EVENT_DETAIL  | VARCHAR [120]  | From MACH_STATUS_TAB.DESCRIPTION  |      

### **18.4	TRI EVENTS**
The FDR_TRI_EVENTS_TAB holds information for each TRI also called MUX event. In this case, an event is changing status of TRI.
| FIELDS  | DATA_TYPE  | DESCRIPTION  |      
|---|---|---|
| EVENT_NAME  | CHAR [24]  | Event related to TRI system. From APP_STATUS_TAB.STATUS  |      
| TRI_NAME  | CHAR [24]  | Identification number of the EDS. From APP_ADMIN_TAB.APP_NAME  |      
| USER_NAME  | CHAR [16]  | Depending on the event (logoff, logon) name of the user  |      
| EVENT_DATE  | DATE  | Date when the event occurred (mm-dd-yy)  |      
| EVENT_TIME  | TIME  | Time when the event occurred (hh:mn:ss)  |      
| EVENT_DETAIL  | VARCHAR [120]  | From APP_STATUS_TAB.DESCRIPTION  |

### **18.5	SCI EVENTS**
The FDR_SCI_EVENTS_TAB holds information for each MUX system event. In this case, an event is a command passed to a machine, a change in settings or administrative tasks like account creation…
| FIELDS  | DATA_TYPE  | DESCRIPTION  |   
|---|---|---|
| EVENT_NAME  | CHAR [24]  | Event related to the CI, from APP_CMD_TAB.COMMAND.Other event related to SCI: administration, Supervision (TBD)|    
| SCI_NAME  | CHAR [24]  | Identification number of the EDS. From APP_ADMIN_TAB.APP_NAME  |    
| USER_NAME  | CHAR [16]  | Depending on the event (logoff, logon) name of the user  |    
| EVENT_DATE  | DATE  | Date when the event occurred   |    
| EVENT_TIME  | TIME  | Time when the event occurred (hh:mn:ss)  |    
| EVENT_DETAIL  | VARCHAR [120]  | From APP_CMD_TAB.DESCRIPTION  | 

### **18.6	THREAT ALARM INFORMATION**
The FDR_THREAT_TAB holds information for each threat identified in a bag. As of today, threats are classified in the following categories: Shield (SH), Military (MI), Commercial (CO), Sheet (ST), TS (Thin Sheet), Bulk (BL) and Special (SP). A record shall be created for each threat and bag key duplicated.
| FIELDS  | DATA_TYPE  | DESCRIPTION  |   
|---|---|---|
| BAG_KEY  | INTEGER  | For non-TIP bag, it is the Global Unique Identifier. Same as BAG_TAB.BAG_KEY  |   
| THREAT_TYPE  | CHAR [2]  | Type of the threat, one of the following categories: Shield (SH), Military (MI), Commercial (CO), Sheet (ST), TS (Thin Sheet), Bulk (BL) and Special (SP).  |   
| THREAT_WEIGHT  | DECIMAL  | The weight of the threat presented as measured by the system.  |   
| ASSOCIATED_SLICES  | INTEGER  | Total number of slices associated to the threat  |   
| NUM_VIEWED_SLICES  | INTEGER  | Total number of associated slice which have been viewed by the user  |   

### **18.7	USER FUNCTION KEYSTROKE INFORMATION**
The FDR_KEYSTROKE_TAB holds information on which function keystroke is used for a given bag. If multiple keystrokes are used, a record shall be created for each of them and bag key duplicated.

| FIELDS  | DATA_TYPE  | DESCRIPTION  |    
|---|---|---|
| BAG_KEY  | INTEGER  | Global Unique Identifier. Same as BAG_TAB.BAG_KEY for Non-TIP bag. TIP bags are assigned a unique key based on BAG_ADMIN_TAB when there are displayed.  |    
| KEYSTROKE_TYPE  | CHAR [2]  | Function key used: Color of threat (CT), Sharpen Image (SI)… TBD|    
| KEYSTROKE_DATE  | DATE  | Date (mm-dd-yy) the function keystroke was used  |   
| KEYSTROKE_TIME  | TIME  | Time (hh:mn:ss) the function keystroke was used  |    

### **18.8	THREAT IMAGE PROJECTION (TIP) INFORMATION (TBD)**
Information for TIP images 

| FIELDS  | DATA_TYPE  | DESCRIPTION  |  
|---|---|---|
| BAG_KEY  | INTEGER  | Global Unique Identifier for the associated TIP bag  |      
| MACH_NAME  | CHAR [16]  | ?  |      
| TIP_ID  | CHAR [10]  | TIP bag identification (equivalent of BAG_ID/IATA for real bag)  |      
| THREAT_TYPE  | CHAR [2]  | Type of threat presented: Shield (SH), Military (MI), Commercial (CO), Sheet (ST), TS (Thin Sheet), Bulk (BL) and Special (SP).  |      
| THREAT_SUBTYPE  | CHAR [2]  | For Bulk explosive, type of item presented: BB for bag as bomb, CE for contained electronic, CO for contain other, OP for open, SP for sympatic  |      
| WEIGHT_TYPE  |  CHAR [2] | For Bulk explosive, weight of the explosive mass presented in IED TIP: LT for less than 100%, EQ for 100%, GT for greater than 100%  |   
| THREAT_RATIO  | INTEGER  | Percentage of current threat (IEDs and shields) TIP images presented relative to all other TIP images  |      
| FA_RATIO  | INTEGER  | Percentage of non-threat false alarm TIP images presented relative to all other TIP images  |      

### **18.9	ON THE JOB TRAINING (OJT) INFORMATION (TBD)**
To be defined by new Training Simulator requirements
### **18.10	OPERATOR QUALIFICATION TEST (OQT) INFORMATION (TBD)**
To be defined by new Training Simulator requirements


