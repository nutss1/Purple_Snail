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
|  0 |  0 |   |   |   
|  1 |  1 |   |   |   
|  ... |   |   |   |   
|  100 | 1100  |   |   |   
|  101 | 1101  |   |   |   
|  102 | 1102  |   |   |   
|  103 | 1103  |   |   |   
|  ... |   |   |   |   
|  200 |  1200 |   |   |   
|  ... |   |   |   |   
|  301 |  1301 |   |   |   
|  302 |  1302 |   |   |   
|  303 |  1303 |   |   |   
|  ... |   |   |   |   
|  400 |  1400 |   |   |   
|  401 |  1401 |   |   |   
|  402 |  1402 |   |   |   
|  ... |   |   |   |   
|  500 |  1500 |   |   |   
|  501 |  1501 |   |   |   
|  502 |  1502 |   |   |   
|  503 |  1503 |   |   |   
|  ... |   |   |   |   






















