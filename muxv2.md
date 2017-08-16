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
| SRD1120 |  |     |
| SRD1109 | **3.2.1 Database**|     |
| SRD969 |  |     |
| SRD1121 |  |     |
| SRD1110 |  |     |
| SRD1000 |  |     |
| SRD1113 |  |     |
| SRD1141 |  |     |
| SRD1114 |  |     |
| SRD970 |  |     |
| SRD971 |  |     |
| SRD1001 |  |     |
| SRD1002 |  |     |
| SRD1152 |  |     |
| SRD1003 |  |     |
| SRD1004 |  |     |
| SRD1153 |  |     |
| SRD1186 |  |     |
| SRD1005 |  |     |
| SRD1006 |  |     |
| SRD972 |  |     |
| SRD973 |  |     |
| SRD1008 |  |     |
| SRD1150 |  |     |
| SRD1151 |  |     |
| SRD1009 |  |     |
| SRD1012 |  |     |
| SRD1013 |  |     |
| SRD1014 |  |     |
| SRD1016 |  |     |
| SRD1018 |  |     |
| SRD1019 |  |     |
| SRD1047 |  |     |
| SRD1185 |  |     |
| SRD1021 |  |     |
| SRD974 |  |     |
| SRD975 |  |     |
| SRD1023 |  |     |
| SRD1025 |  |     |
| SRD1026 |  |     |
| SRD1068 |  |     |
| SRD1070 |  |     |
| SRD1072 |  |     |
| SRD978 |  |     |
| SRD979 |  |     |
| SRD1030 |  |     |
| SRD1031 |  |     |
| SRD1032 |  |     |
| SRD1033 |  |     |
| SRD980 |  |     |
| SRD1075 |  |     |
| SRD1077 |  |     |
| SRD984 |  |     |
| SRD985 |  |     |
| SRD981 |  |     |
| SRD1080 |  |     |
| SRD1081 |  |     |
| SRD986 |  |     |
| SRD987 |  |     |
| SRD1144 |  |     |
| SRD1051 |  |     |
| SRD988 |  |     |
| SRD1134 |  |     |
| SRD1135 |  |     |
| SRD1155 |  |     |
| SRD1089 |  |     |
| SRD989 |  |     |
| SRD1124 |  |     |
| SRD1125 |  |     |
| SRD1090 |  |     |
| SRD1154 |  |     |
| SRD1107 |  |     |
| SRD990 |  |     |
| SRD991 |  |     |
| SRD1136 |  |     |
| SRD1029 |  |     |
| SRD992 |  |     |
| SRD1174 |  |     |
| SRD993 |  |     |
| SRD1168 |  |     |
| SRD1138 |  |     |
| SRD1170 |  |     |
| SRD1087 |  |     |
| SRD1184 |  |     |
| SRD1177 |  |     |
| SRD1179 |  |     |
| SRD1180 |  |     |
| SRD1172 |  |     |
| SRD994 |  |     |
| SRD995 |  |     |
| SRD1126 |  |     |
| SRD996 |  |     |
| SRD1127 |  |     |
| SRD1084 |  |     |
| SRD1131 |  |     |
| SRD1086 |  |     |
| SRD1128 |  |     |
| SRD997 |  |     |
| SRD998 |  |     |
| SRD1188 |  |     |
| SRD1042 |  |     |
| SRD1187 |  |     |
| SRD1043 |  |     |
| SRD1044 |  |     |
| SRD1062 |  |     |
| SRD1064 |  |     |
| SRD1148 |  |     |
| SRD1066 |  |     |
