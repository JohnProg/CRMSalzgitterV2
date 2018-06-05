
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable()
export class CRMQLQueries {
    findCustCatalogsQl = gql`query 
        findCustCatalogs($custid: Int!) {
            customer(sid: $custid) { id name }
            findCustomerContacts(custid: $custid) { id name isActive  } 
            findDeliveryPoint(custid: $custid) { id cDPName isActive  } 
        }
    `;



    // Put actions for catalogs 

 
 

 
 
   
    	

	actionopportunity = {
        saveName: 'saveactionopportunity',
        deleteName: 'deleteactionopportunity',
        listName: 'actionOpportunities',
        singleName: 'actionOpportunity',
        loadql : gql`
        query 
        {  
		    actionOpportunities {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              actionOpportunity($sid: Int!) {
                  actionOpportunity(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ActionOpportunityInputQL!){ saveactionopportunity(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteactionopportunity(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   actionopportunitydoctype = {
        saveName: 'saveactionopportunitydoctype',
        deleteName: 'deleteactionopportunitydoctype',
        listName: 'actionOpportunityDocTypes',
        singleName: 'actionOpportunityDocType',
        loadql : gql`
        query 
        {  
		    actionOpportunityDocTypes {
							 id
							 idActionOpportunity
							 idDocType
							 idTemplateEmail
							 idStatus
							 eMailTo
							 actionClass
							 beforeEMailClass
							 afterEMailClass
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              actionOpportunityDocType($sid: Int!) {
                  actionOpportunityDocType(sid: $sid) { 
	
								 id
							 idActionOpportunity
							 idDocType
							 idTemplateEmail
							 idStatus
							 eMailTo
							 actionClass
							 beforeEMailClass
							 afterEMailClass
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ActionOpportunityDocTypeInputQL!){ saveactionopportunitydoctype(value: $evalue) { 
				 id
							 idActionOpportunity
							 idDocType
							 idTemplateEmail
							 idStatus
							 eMailTo
							 actionClass
							 beforeEMailClass
							 afterEMailClass
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteactionopportunitydoctype(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   bank = {
        saveName: 'savebank',
        deleteName: 'deletebank',
        listName: 'banks',
        singleName: 'bank',
        loadql : gql`
        query 
        {  
		    banks {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              bank($sid: Int!) {
                  bank(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:BankInputQL!){ savebank(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletebank(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   broker = {
        saveName: 'savebroker',
        deleteName: 'deletebroker',
        listName: 'brokers',
        singleName: 'broker',
        loadql : gql`
        query 
        {  
		    brokers {
							 id
							 name
							 agentNumber
							 contactName
							 eMail
							 street
							 number
							 idColony
							 rFC
							 phoneUSA
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              broker($sid: Int!) {
                  broker(sid: $sid) { 
	
								 id
							 name
							 agentNumber
							 contactName
							 eMail
							 street
							 number
							 idColony
							 rFC
							 phoneUSA
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:BrokerInputQL!){ savebroker(value: $evalue) { 
				 id
							 name
							 agentNumber
							 contactName
							 eMail
							 street
							 number
							 idColony
							 rFC
							 phoneUSA
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletebroker(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   category = {
        saveName: 'savecategory',
        deleteName: 'deletecategory',
        listName: 'categories',
        singleName: 'category',
        loadql : gql`
        query 
        {  
		    categories {
							 categoryID
							 categoryName
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              category($sid: Int!) {
                  category(sid: $sid) { 
	
								 categoryID
							 categoryName
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CategoryInputQL!){ savecategory(value: $evalue) { 
				 categoryID
							 categoryName
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecategory(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   categorylog = {
        saveName: 'savecategorylog',
        deleteName: 'deletecategorylog',
        listName: 'categoryLogs',
        singleName: 'categoryLog',
        loadql : gql`
        query 
        {  
		    categoryLogs {
							 categoryLogID
							 categoryID
							 logID
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              categoryLog($sid: Int!) {
                  categoryLog(sid: $sid) { 
	
								 categoryLogID
							 categoryID
							 logID
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CategoryLogInputQL!){ savecategorylog(value: $evalue) { 
				 categoryLogID
							 categoryID
							 logID
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecategorylog(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   city = {
        saveName: 'savecity',
        deleteName: 'deletecity',
        listName: 'cities',
        singleName: 'city',
        loadql : gql`
        query 
        {  
		    cities {
							 id
							 idState
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              city($sid: Int!) {
                  city(sid: $sid) { 
	
								 id
							 idState
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CityInputQL!){ savecity(value: $evalue) { 
				 id
							 idState
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecity(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   collectiondatatype = {
        saveName: 'savecollectiondatatype',
        deleteName: 'deletecollectiondatatype',
        listName: 'collectionDataTypes',
        singleName: 'collectionDataType',
        loadql : gql`
        query 
        {  
		    collectionDataTypes {
							 id
							 cType
							 name
							 description
							 applyTax
							 factor
							 asImporter
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              collectionDataType($sid: Int!) {
                  collectionDataType(sid: $sid) { 
	
								 id
							 cType
							 name
							 description
							 applyTax
							 factor
							 asImporter
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CollectionDataTypeInputQL!){ savecollectiondatatype(value: $evalue) { 
				 id
							 cType
							 name
							 description
							 applyTax
							 factor
							 asImporter
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecollectiondatatype(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   collectionimporterrelation = {
        saveName: 'savecollectionimporterrelation',
        deleteName: 'deletecollectionimporterrelation',
        listName: 'collectionImporterRelations',
        singleName: 'collectionImporterRelation',
        loadql : gql`
        query 
        {  
		    collectionImporterRelations {
							 id
							 asImporter
							 cType
							 idCollectionDataType
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              collectionImporterRelation($sid: Int!) {
                  collectionImporterRelation(sid: $sid) { 
	
								 id
							 asImporter
							 cType
							 idCollectionDataType
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CollectionImporterRelationInputQL!){ savecollectionimporterrelation(value: $evalue) { 
				 id
							 asImporter
							 cType
							 idCollectionDataType
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecollectionimporterrelation(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   colony = {
        saveName: 'savecolony',
        deleteName: 'deletecolony',
        listName: 'colonies',
        singleName: 'colony',
        loadql : gql`
        query 
        {  
		    colonies {
							 id
							 idCity
							 zipCode
							 name
							 description
							 idColonyType
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              colony($sid: Int!) {
                  colony(sid: $sid) { 
	
								 id
							 idCity
							 zipCode
							 name
							 description
							 idColonyType
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ColonyInputQL!){ savecolony(value: $evalue) { 
				 id
							 idCity
							 zipCode
							 name
							 description
							 idColonyType
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecolony(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   colonytype = {
        saveName: 'savecolonytype',
        deleteName: 'deletecolonytype',
        listName: 'colonyTypes',
        singleName: 'colonyType',
        loadql : gql`
        query 
        {  
		    colonyTypes {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              colonyType($sid: Int!) {
                  colonyType(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ColonyTypeInputQL!){ savecolonytype(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecolonytype(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   company = {
        saveName: 'savecompany',
        deleteName: 'deletecompany',
        listName: 'companies',
        singleName: 'company',
        loadql : gql`
        query 
        {  
		    companies {
							 id
							 companyName
							 street
							 number
							 idColony
							 phone
							 fax
							 legalResponsible
							 logo
							 taxAmount
							 rFC
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              company($sid: Int!) {
                  company(sid: $sid) { 
	
								 id
							 companyName
							 street
							 number
							 idColony
							 phone
							 fax
							 legalResponsible
							 logo
							 taxAmount
							 rFC
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CompanyInputQL!){ savecompany(value: $evalue) { 
				 id
							 companyName
							 street
							 number
							 idColony
							 phone
							 fax
							 legalResponsible
							 logo
							 taxAmount
							 rFC
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecompany(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   companytarget = {
        saveName: 'savecompanytarget',
        deleteName: 'deletecompanytarget',
        listName: 'companyTargets',
        singleName: 'companyTarget',
        loadql : gql`
        query 
        {  
		    companyTargets {
							 id
							 idCompany
							 targetYear
							 idFamily
							 target
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              companyTarget($sid: Int!) {
                  companyTarget(sid: $sid) { 
	
								 id
							 idCompany
							 targetYear
							 idFamily
							 target
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CompanyTargetInputQL!){ savecompanytarget(value: $evalue) { 
				 id
							 idCompany
							 targetYear
							 idFamily
							 target
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecompanytarget(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   contact = {
        saveName: 'savecontact',
        deleteName: 'deletecontact',
        listName: 'contacts',
        singleName: 'contact',
        loadql : gql`
        query 
        {  
		    contacts {
							 id
							 idOrganization
							 idDepartment
							 name
							 officePhone
							 cellPhone
							 eMail
							 isActive
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              contact($sid: Int!) {
                  contact(sid: $sid) { 
	
								 id
							 idOrganization
							 idDepartment
							 name
							 officePhone
							 cellPhone
							 eMail
							 isActive
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ContactInputQL!){ savecontact(value: $evalue) { 
				 id
							 idOrganization
							 idDepartment
							 name
							 officePhone
							 cellPhone
							 eMail
							 isActive
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecontact(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   country = {
        saveName: 'savecountry',
        deleteName: 'deletecountry',
        listName: 'countries',
        singleName: 'country',
        loadql : gql`
        query 
        {  
		    countries {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              country($sid: Int!) {
                  country(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CountryInputQL!){ savecountry(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecountry(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   currency = {
        saveName: 'savecurrency',
        deleteName: 'deletecurrency',
        listName: 'currencies',
        singleName: 'currency',
        loadql : gql`
        query 
        {  
		    currencies {
							 id
							 name
							 description
							 aSign
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              currency($sid: Int!) {
                  currency(sid: $sid) { 
	
								 id
							 name
							 description
							 aSign
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CurrencyInputQL!){ savecurrency(value: $evalue) { 
				 id
							 name
							 description
							 aSign
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecurrency(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customer = {
        saveName: 'savecustomer',
        deleteName: 'deletecustomer',
        listName: 'customers',
        singleName: 'customer',
        loadql : gql`
        query 
        {  
		    customers {
							 id
							 name
							 street
							 number
							 idColony
							 phone
							 rFC
							 daysCredit
							 limitCreditUSA
							 limitCreditGermany
							 idResponsible
							 interestRate
							 isAutomotive
							 isActive
							 idCurrency
							 isTax
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customer($sid: Int!) {
                  customer(sid: $sid) { 
	
								 id
							 name
							 street
							 number
							 idColony
							 phone
							 rFC
							 daysCredit
							 limitCreditUSA
							 limitCreditGermany
							 idResponsible
							 interestRate
							 isAutomotive
							 isActive
							 idCurrency
							 isTax
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerInputQL!){ savecustomer(value: $evalue) { 
				 id
							 name
							 street
							 number
							 idColony
							 phone
							 rFC
							 daysCredit
							 limitCreditUSA
							 limitCreditGermany
							 idResponsible
							 interestRate
							 isAutomotive
							 isActive
							 idCurrency
							 isTax
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomer(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customerbroker = {
        saveName: 'savecustomerbroker',
        deleteName: 'deletecustomerbroker',
        listName: 'customerBrokers',
        singleName: 'customerBroker',
        loadql : gql`
        query 
        {  
		    customerBrokers {
							 id
							 idCustomer
							 idBroker
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerBroker($sid: Int!) {
                  customerBroker(sid: $sid) { 
	
								 id
							 idCustomer
							 idBroker
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerBrokerInputQL!){ savecustomerbroker(value: $evalue) { 
				 id
							 idCustomer
							 idBroker
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomerbroker(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customercontact = {
        saveName: 'savecustomercontact',
        deleteName: 'deletecustomercontact',
        listName: 'customerContacts',
        singleName: 'customerContact',
        loadql : gql`
        query 
        {  
		    customerContacts {
							 id
							 idCustomer
							 name
							 idPosition
							 officePhone
							 extension
							 cellPhone
							 email
							 fechaNacimiento
							 isActive
							 nickName
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerContact($sid: Int!) {
                  customerContact(sid: $sid) { 
	
								 id
							 idCustomer
							 name
							 idPosition
							 officePhone
							 extension
							 cellPhone
							 email
							 fechaNacimiento
							 isActive
							 nickName
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerContactInputQL!){ savecustomercontact(value: $evalue) { 
				 id
							 idCustomer
							 name
							 idPosition
							 officePhone
							 extension
							 cellPhone
							 email
							 fechaNacimiento
							 isActive
							 nickName
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomercontact(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customerdeliverypoint = {
        saveName: 'savecustomerdeliverypoint',
        deleteName: 'deletecustomerdeliverypoint',
        listName: 'customerDeliveryPoints',
        singleName: 'customerDeliveryPoint',
        loadql : gql`
        query 
        {  
		    customerDeliveryPoints {
							 id
							 idDeliveryType
							 idCustomer
							 cDPName
							 cDPStreet
							 idColony
							 cDPTelephone
							 cDPContact
							 isActive
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerDeliveryPoint($sid: Int!) {
                  customerDeliveryPoint(sid: $sid) { 
	
								 id
							 idDeliveryType
							 idCustomer
							 cDPName
							 cDPStreet
							 idColony
							 cDPTelephone
							 cDPContact
							 isActive
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerDeliveryPointInputQL!){ savecustomerdeliverypoint(value: $evalue) { 
				 id
							 idDeliveryType
							 idCustomer
							 cDPName
							 cDPStreet
							 idColony
							 cDPTelephone
							 cDPContact
							 isActive
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomerdeliverypoint(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customerdocument = {
        saveName: 'savecustomerdocument',
        deleteName: 'deletecustomerdocument',
        listName: 'customerDocuments',
        singleName: 'customerDocument',
        loadql : gql`
        query 
        {  
		    customerDocuments {
							 id
							 idCustomer
							 docName
							 parentFolder
							 docId
							 dateUploaded
							 comment
							 idDocumentType
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerDocument($sid: Int!) {
                  customerDocument(sid: $sid) { 
	
								 id
							 idCustomer
							 docName
							 parentFolder
							 docId
							 dateUploaded
							 comment
							 idDocumentType
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerDocumentInputQL!){ savecustomerdocument(value: $evalue) { 
				 id
							 idCustomer
							 docName
							 parentFolder
							 docId
							 dateUploaded
							 comment
							 idDocumentType
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomerdocument(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customermarket = {
        saveName: 'savecustomermarket',
        deleteName: 'deletecustomermarket',
        listName: 'customerMarkets',
        singleName: 'customerMarket',
        loadql : gql`
        query 
        {  
		    customerMarkets {
							 id
							 idCustomer
							 idMarket
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerMarket($sid: Int!) {
                  customerMarket(sid: $sid) { 
	
								 id
							 idCustomer
							 idMarket
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerMarketInputQL!){ savecustomermarket(value: $evalue) { 
				 id
							 idCustomer
							 idMarket
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomermarket(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customerproduct = {
        saveName: 'savecustomerproduct',
        deleteName: 'deletecustomerproduct',
        listName: 'customerProducts',
        singleName: 'customerProduct',
        loadql : gql`
        query 
        {  
		    customerProducts {
							 id
							 idCustomer
							 idProduct
							 isAutomotive
							 comments
							 salesTons
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerProduct($sid: Int!) {
                  customerProduct(sid: $sid) { 
	
								 id
							 idCustomer
							 idProduct
							 isAutomotive
							 comments
							 salesTons
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerProductInputQL!){ savecustomerproduct(value: $evalue) { 
				 id
							 idCustomer
							 idProduct
							 isAutomotive
							 comments
							 salesTons
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomerproduct(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customerproductextended = {
        saveName: 'savecustomerproductextended',
        deleteName: 'deletecustomerproductextended',
        listName: 'customerProductExtendeds',
        singleName: 'customerProductExtended',
        loadql : gql`
        query 
        {  
		    customerProductExtendeds {
							 idCustomerProduct
							 customerName
							 buyerName
							 platform
							 partNumberOEM
							 partNumberBuyer
							 eAU
							 prodDescription
							 comments
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerProductExtended($sid: Int!) {
                  customerProductExtended(sid: $sid) { 
	
								 idCustomerProduct
							 customerName
							 buyerName
							 platform
							 partNumberOEM
							 partNumberBuyer
							 eAU
							 prodDescription
							 comments
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerProductExtendedInputQL!){ savecustomerproductextended(value: $evalue) { 
				 idCustomerProduct
							 customerName
							 buyerName
							 platform
							 partNumberOEM
							 partNumberBuyer
							 eAU
							 prodDescription
							 comments
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomerproductextended(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customerproductprice = {
        saveName: 'savecustomerproductprice',
        deleteName: 'deletecustomerproductprice',
        listName: 'customerProductPrices',
        singleName: 'customerProductPrice',
        loadql : gql`
        query 
        {  
		    customerProductPrices {
							 id
							 idCustomerProduct
							 validFrom
							 validTo
							 price
							 comments
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerProductPrice($sid: Int!) {
                  customerProductPrice(sid: $sid) { 
	
								 id
							 idCustomerProduct
							 validFrom
							 validTo
							 price
							 comments
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerProductPriceInputQL!){ savecustomerproductprice(value: $evalue) { 
				 id
							 idCustomerProduct
							 validFrom
							 validTo
							 price
							 comments
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomerproductprice(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customerproductproperty = {
        saveName: 'savecustomerproductproperty',
        deleteName: 'deletecustomerproductproperty',
        listName: 'customerProductProperties',
        singleName: 'customerProductProperty',
        loadql : gql`
        query 
        {  
		    customerProductProperties {
							 id
							 idCustomerProduct
							 idProperty
							 propertyValue
							 comments
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerProductProperty($sid: Int!) {
                  customerProductProperty(sid: $sid) { 
	
								 id
							 idCustomerProduct
							 idProperty
							 propertyValue
							 comments
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerProductPropertyInputQL!){ savecustomerproductproperty(value: $evalue) { 
				 id
							 idCustomerProduct
							 idProperty
							 propertyValue
							 comments
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomerproductproperty(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customerrailspur = {
        saveName: 'savecustomerrailspur',
        deleteName: 'deletecustomerrailspur',
        listName: 'customerRailSpurs',
        singleName: 'customerRailSpur',
        loadql : gql`
        query 
        {  
		    customerRailSpurs {
							 id
							 idCustomer
							 idRailSpur
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerRailSpur($sid: Int!) {
                  customerRailSpur(sid: $sid) { 
	
								 id
							 idCustomer
							 idRailSpur
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerRailSpurInputQL!){ savecustomerrailspur(value: $evalue) { 
				 id
							 idCustomer
							 idRailSpur
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomerrailspur(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   customersector = {
        saveName: 'savecustomersector',
        deleteName: 'deletecustomersector',
        listName: 'customerSectors',
        singleName: 'customerSector',
        loadql : gql`
        query 
        {  
		    customerSectors {
							 id
							 idCustomer
							 idSector
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              customerSector($sid: Int!) {
                  customerSector(sid: $sid) { 
	
								 id
							 idCustomer
							 idSector
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:CustomerSectorInputQL!){ savecustomersector(value: $evalue) { 
				 id
							 idCustomer
							 idSector
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletecustomersector(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   deliverytype = {
        saveName: 'savedeliverytype',
        deleteName: 'deletedeliverytype',
        listName: 'deliveryTypes',
        singleName: 'deliveryType',
        loadql : gql`
        query 
        {  
		    deliveryTypes {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              deliveryType($sid: Int!) {
                  deliveryType(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:DeliveryTypeInputQL!){ savedeliverytype(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletedeliverytype(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   department = {
        saveName: 'savedepartment',
        deleteName: 'deletedepartment',
        listName: 'departments',
        singleName: 'department',
        loadql : gql`
        query 
        {  
		    departments {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              department($sid: Int!) {
                  department(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:DepartmentInputQL!){ savedepartment(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletedepartment(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   doctype = {
        saveName: 'savedoctype',
        deleteName: 'deletedoctype',
        listName: 'docTypes',
        singleName: 'docType',
        loadql : gql`
        query 
        {  
		    docTypes {
							 id
							 name
							 description
							 rootFolder
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              docType($sid: Int!) {
                  docType(sid: $sid) { 
	
								 id
							 name
							 description
							 rootFolder
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:DocTypeInputQL!){ savedoctype(value: $evalue) { 
				 id
							 name
							 description
							 rootFolder
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletedoctype(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   doctypestatu = {
        saveName: 'savedoctypestatu',
        deleteName: 'deletedoctypestatu',
        listName: 'docTypeStatus',
        singleName: 'docTypeStatu',
        loadql : gql`
        query 
        {  
		    docTypeStatus {
							 id
							 idDocType
							 idStatus
							 allowChild
							 isEditable
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              docTypeStatu($sid: Int!) {
                  docTypeStatu(sid: $sid) { 
	
								 id
							 idDocType
							 idStatus
							 allowChild
							 isEditable
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:DocTypeStatuInputQL!){ savedoctypestatu(value: $evalue) { 
				 id
							 idDocType
							 idStatus
							 allowChild
							 isEditable
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletedoctypestatu(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   documenttype = {
        saveName: 'savedocumenttype',
        deleteName: 'deletedocumenttype',
        listName: 'documentTypes',
        singleName: 'documentType',
        loadql : gql`
        query 
        {  
		    documentTypes {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              documentType($sid: Int!) {
                  documentType(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:DocumentTypeInputQL!){ savedocumenttype(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletedocumenttype(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   estatusopportunity = {
        saveName: 'saveestatusopportunity',
        deleteName: 'deleteestatusopportunity',
        listName: 'estatusOpportunities',
        singleName: 'estatusOpportunity',
        loadql : gql`
        query 
        {  
		    estatusOpportunities {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              estatusOpportunity($sid: Int!) {
                  estatusOpportunity(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:EstatusOpportunityInputQL!){ saveestatusopportunity(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteestatusopportunity(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   exchangerate = {
        saveName: 'saveexchangerate',
        deleteName: 'deleteexchangerate',
        listName: 'exchangeRates',
        singleName: 'exchangeRate',
        loadql : gql`
        query 
        {  
		    exchangeRates {
							 id
							 idCurrency
							 tDate
							 value
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              exchangeRate($sid: Int!) {
                  exchangeRate(sid: $sid) { 
	
								 id
							 idCurrency
							 tDate
							 value
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ExchangeRateInputQL!){ saveexchangerate(value: $evalue) { 
				 id
							 idCurrency
							 tDate
							 value
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteexchangerate(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   family = {
        saveName: 'savefamily',
        deleteName: 'deletefamily',
        listName: 'families',
        singleName: 'family',
        loadql : gql`
        query 
        {  
		    families {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              family($sid: Int!) {
                  family(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:FamilyInputQL!){ savefamily(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletefamily(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   incoterm = {
        saveName: 'saveincoterm',
        deleteName: 'deleteincoterm',
        listName: 'incoTerms',
        singleName: 'incoTerm',
        loadql : gql`
        query 
        {  
		    incoTerms {
							 id
							 name
							 description
							 deliveryRequired
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              incoTerm($sid: Int!) {
                  incoTerm(sid: $sid) { 
	
								 id
							 name
							 description
							 deliveryRequired
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:IncoTermInputQL!){ saveincoterm(value: $evalue) { 
				 id
							 name
							 description
							 deliveryRequired
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteincoterm(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   linerterm = {
        saveName: 'savelinerterm',
        deleteName: 'deletelinerterm',
        listName: 'linerTerms',
        singleName: 'linerTerm',
        loadql : gql`
        query 
        {  
		    linerTerms {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              linerTerm($sid: Int!) {
                  linerTerm(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:LinerTermInputQL!){ savelinerterm(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletelinerterm(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   log = {
        saveName: 'savelog',
        deleteName: 'deletelog',
        listName: 'logs',
        singleName: 'log',
        loadql : gql`
        query 
        {  
		    logs {
							 logId
							 eventId
							 priority
							 severity
							 title
							 timestamp
							 machineName
							 appDomainName
							 processID
							 processName
							 threadName
							 win32ThreadId
							 message
							 formattedMessage
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              log($sid: Int!) {
                  log(sid: $sid) { 
	
								 logId
							 eventId
							 priority
							 severity
							 title
							 timestamp
							 machineName
							 appDomainName
							 processID
							 processName
							 threadName
							 win32ThreadId
							 message
							 formattedMessage
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:LogInputQL!){ savelog(value: $evalue) { 
				 logId
							 eventId
							 priority
							 severity
							 title
							 timestamp
							 machineName
							 appDomainName
							 processID
							 processName
							 threadName
							 win32ThreadId
							 message
							 formattedMessage
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletelog(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   market = {
        saveName: 'savemarket',
        deleteName: 'deletemarket',
        listName: 'markets',
        singleName: 'market',
        loadql : gql`
        query 
        {  
		    markets {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              market($sid: Int!) {
                  market(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:MarketInputQL!){ savemarket(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletemarket(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   messagetemplate = {
        saveName: 'savemessagetemplate',
        deleteName: 'deletemessagetemplate',
        listName: 'messageTemplates',
        singleName: 'messageTemplate',
        loadql : gql`
        query 
        {  
		    messageTemplates {
							 id
							 messageSubject
							 messageBody
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              messageTemplate($sid: Int!) {
                  messageTemplate(sid: $sid) { 
	
								 id
							 messageSubject
							 messageBody
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:MessageTemplateInputQL!){ savemessagetemplate(value: $evalue) { 
				 id
							 messageSubject
							 messageBody
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletemessagetemplate(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   mill = {
        saveName: 'savemill',
        deleteName: 'deletemill',
        listName: 'mills',
        singleName: 'mill',
        loadql : gql`
        query 
        {  
		    mills {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              mill($sid: Int!) {
                  mill(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:MillInputQL!){ savemill(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletemill(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   millcountry = {
        saveName: 'savemillcountry',
        deleteName: 'deletemillcountry',
        listName: 'searchCountriesByMill',
        singleName: 'millCountry',
        loadql : gql`
        query 
          
		    searchCountriesByMill($idmill: Int!) {
				searchCountriesByMill(idmill: $idmill) {
							 id
							 name
							 description
							 idCountry
			 } 
			}
		
      `,    
       loadentity : gql`
        query 
              millCountry($sid: Int!) {
                  millCountry(sid: $sid) { 
	
								 id
							 idMill
							 idCountry
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:MillCountryInputQL!){ savemillcountry(value: $evalue) { 
				 id
							 idMill
							 idCountry
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletemillcountry(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   millproduct = {
        saveName: 'savemillproduct',
        deleteName: 'deletemillproduct',
        listName: 'millProducts',
        singleName: 'millProduct',
        loadql : gql`
        query 
        {  
		    millProducts {
							 id
							 idMill
							 idProduct
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              millProduct($sid: Int!) {
                  millProduct(sid: $sid) { 
	
								 id
							 idMill
							 idProduct
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:MillProductInputQL!){ savemillproduct(value: $evalue) { 
				 id
							 idMill
							 idProduct
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletemillproduct(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   opportunity = {
        saveName: 'saveopportunity',
        deleteName: 'deleteopportunity',
        listName: 'opportunities',
        singleName: 'opportunity',
        loadql : gql`
        query 
        {  
		    opportunities {
							 id
							 idResponsible
							 idCustomer
							 idCustomerContact
							 idCurrency
							 idContact
							 idStatus
							 dateCreated
							 lastUpdated
							 idUser
							 idPort
							 idIncoTerm
							 idLinerTerms
							 isActive
							 idMarket
							 idSector
							 oppNotes
							 asImporter
							 idTransactionFlow
							 idDocType
							 idTypeOpp
							 comments
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 subtotal
							 tax
							 taxAmount
							 total
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              opportunity($sid: Int!) {
                  opportunity(sid: $sid) { 
	
								 id
							 idResponsible
							 idCustomer
							 idCustomerContact
							 idCurrency
							 idContact
							 idStatus
							 dateCreated
							 lastUpdated
							 idUser
							 idPort
							 idIncoTerm
							 idLinerTerms
							 isActive
							 idMarket
							 idSector
							 oppNotes
							 asImporter
							 idTransactionFlow
							 idDocType
							 idTypeOpp
							 comments
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 subtotal
							 tax
							 taxAmount
							 total
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:OpportunityInputQL!){ saveopportunity(value: $evalue) { 
				 id
							 idResponsible
							 idCustomer
							 idCustomerContact
							 idCurrency
							 idContact
							 idStatus
							 dateCreated
							 lastUpdated
							 idUser
							 idPort
							 idIncoTerm
							 idLinerTerms
							 isActive
							 idMarket
							 idSector
							 oppNotes
							 asImporter
							 idTransactionFlow
							 idDocType
							 idTypeOpp
							 comments
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 subtotal
							 tax
							 taxAmount
							 total
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteopportunity(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   opportunitydetail = {
        saveName: 'saveopportunitydetail',
        deleteName: 'deleteopportunitydetail',
        listName: 'opportunityDetails',
        singleName: 'opportunityDetail',
        loadql : gql`
        query 
        {  
		    opportunityDetails {
							 id
							 idOpportunity
							 idProduct
							 idCustomerProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 itemExtended
							 dateAdded
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              opportunityDetail($sid: Int!) {
                  opportunityDetail(sid: $sid) { 
	
								 id
							 idOpportunity
							 idProduct
							 idCustomerProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 itemExtended
							 dateAdded
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:OpportunityDetailInputQL!){ saveopportunitydetail(value: $evalue) { 
				 id
							 idOpportunity
							 idProduct
							 idCustomerProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 itemExtended
							 dateAdded
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteopportunitydetail(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   opportunitydetailsumary = {
        saveName: 'saveopportunitydetailsumary',
        deleteName: 'deleteopportunitydetailsumary',
        listName: 'opportunityDetailSumaries',
        singleName: 'opportunityDetailSumary',
        loadql : gql`
        query 
        {  
		    opportunityDetailSumaries {
							 id
							 idOpportunityDetail
							 quantity
							 comment
							 dateCreated
							 price
							 amount
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              opportunityDetailSumary($sid: Int!) {
                  opportunityDetailSumary(sid: $sid) { 
	
								 id
							 idOpportunityDetail
							 quantity
							 comment
							 dateCreated
							 price
							 amount
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:OpportunityDetailSumaryInputQL!){ saveopportunitydetailsumary(value: $evalue) { 
				 id
							 idOpportunityDetail
							 quantity
							 comment
							 dateCreated
							 price
							 amount
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteopportunitydetailsumary(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   opportunitydetailsumaryproperty = {
        saveName: 'saveopportunitydetailsumaryproperty',
        deleteName: 'deleteopportunitydetailsumaryproperty',
        listName: 'opportunityDetailSumaryProperties',
        singleName: 'opportunityDetailSumaryProperty',
        loadql : gql`
        query 
        {  
		    opportunityDetailSumaryProperties {
							 id
							 idOpportunityDetailSumary
							 idProperty
							 propertyValue
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              opportunityDetailSumaryProperty($sid: Int!) {
                  opportunityDetailSumaryProperty(sid: $sid) { 
	
								 id
							 idOpportunityDetailSumary
							 idProperty
							 propertyValue
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:OpportunityDetailSumaryPropertyInputQL!){ saveopportunitydetailsumaryproperty(value: $evalue) { 
				 id
							 idOpportunityDetailSumary
							 idProperty
							 propertyValue
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteopportunitydetailsumaryproperty(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   opportunitydialog = {
        saveName: 'saveopportunitydialog',
        deleteName: 'deleteopportunitydialog',
        listName: 'opportunityDialogs',
        singleName: 'opportunityDialog',
        loadql : gql`
        query 
        {  
		    opportunityDialogs {
							 id
							 idOpportunity
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              opportunityDialog($sid: Int!) {
                  opportunityDialog(sid: $sid) { 
	
								 id
							 idOpportunity
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:OpportunityDialogInputQL!){ saveopportunitydialog(value: $evalue) { 
				 id
							 idOpportunity
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteopportunitydialog(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   opportunitydocument = {
        saveName: 'saveopportunitydocument',
        deleteName: 'deleteopportunitydocument',
        listName: 'opportunityDocuments',
        singleName: 'opportunityDocument',
        loadql : gql`
        query 
        {  
		    opportunityDocuments {
							 id
							 idOpportunityDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              opportunityDocument($sid: Int!) {
                  opportunityDocument(sid: $sid) { 
	
								 id
							 idOpportunityDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:OpportunityDocumentInputQL!){ saveopportunitydocument(value: $evalue) { 
				 id
							 idOpportunityDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteopportunitydocument(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   organization = {
        saveName: 'saveorganization',
        deleteName: 'deleteorganization',
        listName: 'organizations',
        singleName: 'organization',
        loadql : gql`
        query 
        {  
		    organizations {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              organization($sid: Int!) {
                  organization(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:OrganizationInputQL!){ saveorganization(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteorganization(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   paymentterm = {
        saveName: 'savepaymentterm',
        deleteName: 'deletepaymentterm',
        listName: 'paymentTerms',
        singleName: 'paymentTerm',
        loadql : gql`
        query 
        {  
		    paymentTerms {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              paymentTerm($sid: Int!) {
                  paymentTerm(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PaymentTermInputQL!){ savepaymentterm(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletepaymentterm(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   port = {
        saveName: 'saveport',
        deleteName: 'deleteport',
        listName: 'ports',
        singleName: 'port',
        loadql : gql`
        query 
        {  
		    ports {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              port($sid: Int!) {
                  port(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PortInputQL!){ saveport(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteport(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   position = {
        saveName: 'saveposition',
        deleteName: 'deleteposition',
        listName: 'positions',
        singleName: 'position',
        loadql : gql`
        query 
        {  
		    positions {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              position($sid: Int!) {
                  position(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PositionInputQL!){ saveposition(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteposition(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   product = {
        saveName: 'saveproduct',
        deleteName: 'deleteproduct',
        listName: 'products',
        singleName: 'product',
        loadql : gql`
        query 
        {  
		    products {
							 id
							 name
							 description
							 idFamily
							 campaignTemplate
							 campaignTemplateSubject
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              product($sid: Int!) {
                  product(sid: $sid) { 
	
								 id
							 name
							 description
							 idFamily
							 campaignTemplate
							 campaignTemplateSubject
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ProductInputQL!){ saveproduct(value: $evalue) { 
				 id
							 name
							 description
							 idFamily
							 campaignTemplate
							 campaignTemplateSubject
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteproduct(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   productproperty = {
        saveName: 'saveproductproperty',
        deleteName: 'deleteproductproperty',
        listName: 'productProperties',
        singleName: 'productProperty',
        loadql : gql`
        query 
        {  
		    productProperties {
							 id
							 idProduct
							 idProperty
							 pOrder
							 isRequired
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              productProperty($sid: Int!) {
                  productProperty(sid: $sid) { 
	
								 id
							 idProduct
							 idProperty
							 pOrder
							 isRequired
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ProductPropertyInputQL!){ saveproductproperty(value: $evalue) { 
				 id
							 idProduct
							 idProperty
							 pOrder
							 isRequired
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteproductproperty(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   property = {
        saveName: 'saveproperty',
        deleteName: 'deleteproperty',
        listName: 'properties',
        singleName: 'property',
        loadql : gql`
        query 
        {  
		    properties {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              property($sid: Int!) {
                  property(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PropertyInputQL!){ saveproperty(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteproperty(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   purchaseorder = {
        saveName: 'savepurchaseorder',
        deleteName: 'deletepurchaseorder',
        listName: 'purchaseOrders',
        singleName: 'purchaseOrder',
        loadql : gql`
        query 
        {  
		    purchaseOrders {
							 id
							 idOpportunity
							 idQuotationFromSupplier
							 idQuotationToCustomer
							 idDocType
							 idStatus
							 idResponsible
							 idCustomer
							 idCustomerContact
							 idCurrency
							 idContact
							 dateCreated
							 lastUpdated
							 idUser
							 idPort
							 idIncoTerm
							 idLinerTerm
							 isActive
							 idMarket
							 idSector
							 oppNotes
							 asImporter
							 idTransactionFlow
							 sMIM
							 idTypeOpp
							 idMill
							 idCountryOrigin
							 offerValidity
							 shipmentOffered
							 pONumber
							 bookingDate
							 comments
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 orderConfirmDate
							 subtotal
							 tax
							 taxAmount
							 total
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              purchaseOrder($sid: Int!) {
                  purchaseOrder(sid: $sid) { 
	
								 id
							 idOpportunity
							 idQuotationFromSupplier
							 idQuotationToCustomer
							 idDocType
							 idStatus
							 idResponsible
							 idCustomer
							 idCustomerContact
							 idCurrency
							 idContact
							 dateCreated
							 lastUpdated
							 idUser
							 idPort
							 idIncoTerm
							 idLinerTerm
							 isActive
							 idMarket
							 idSector
							 oppNotes
							 asImporter
							 idTransactionFlow
							 sMIM
							 idTypeOpp
							 idMill
							 idCountryOrigin
							 offerValidity
							 shipmentOffered
							 pONumber
							 bookingDate
							 comments
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 orderConfirmDate
							 subtotal
							 tax
							 taxAmount
							 total
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PurchaseOrderInputQL!){ savepurchaseorder(value: $evalue) { 
				 id
							 idOpportunity
							 idQuotationFromSupplier
							 idQuotationToCustomer
							 idDocType
							 idStatus
							 idResponsible
							 idCustomer
							 idCustomerContact
							 idCurrency
							 idContact
							 dateCreated
							 lastUpdated
							 idUser
							 idPort
							 idIncoTerm
							 idLinerTerm
							 isActive
							 idMarket
							 idSector
							 oppNotes
							 asImporter
							 idTransactionFlow
							 sMIM
							 idTypeOpp
							 idMill
							 idCountryOrigin
							 offerValidity
							 shipmentOffered
							 pONumber
							 bookingDate
							 comments
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 orderConfirmDate
							 subtotal
							 tax
							 taxAmount
							 total
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletepurchaseorder(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   purchaseorderconfirmation = {
        saveName: 'savepurchaseorderconfirmation',
        deleteName: 'deletepurchaseorderconfirmation',
        listName: 'purchaseOrderConfirmations',
        singleName: 'purchaseOrderConfirmation',
        loadql : gql`
        query 
        {  
		    purchaseOrderConfirmations {
							 id
							 idPurchaseOrder
							 dateCreated
							 dateSended
							 sendedBy
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              purchaseOrderConfirmation($sid: Int!) {
                  purchaseOrderConfirmation(sid: $sid) { 
	
								 id
							 idPurchaseOrder
							 dateCreated
							 dateSended
							 sendedBy
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PurchaseOrderConfirmationInputQL!){ savepurchaseorderconfirmation(value: $evalue) { 
				 id
							 idPurchaseOrder
							 dateCreated
							 dateSended
							 sendedBy
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletepurchaseorderconfirmation(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   purchaseorderdetail = {
        saveName: 'savepurchaseorderdetail',
        deleteName: 'deletepurchaseorderdetail',
        listName: 'purchaseOrderDetails',
        singleName: 'purchaseOrderDetail',
        loadql : gql`
        query 
        {  
		    purchaseOrderDetails {
							 id
							 idPurchaseOrder
							 idProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 salePrice
							 dateAdded
							 shipQty
							 itemExtended
							 idCustomerProduct
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              purchaseOrderDetail($sid: Int!) {
                  purchaseOrderDetail(sid: $sid) { 
	
								 id
							 idPurchaseOrder
							 idProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 salePrice
							 dateAdded
							 shipQty
							 itemExtended
							 idCustomerProduct
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PurchaseOrderDetailInputQL!){ savepurchaseorderdetail(value: $evalue) { 
				 id
							 idPurchaseOrder
							 idProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 salePrice
							 dateAdded
							 shipQty
							 itemExtended
							 idCustomerProduct
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletepurchaseorderdetail(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   purchaseorderdetailsumary = {
        saveName: 'savepurchaseorderdetailsumary',
        deleteName: 'deletepurchaseorderdetailsumary',
        listName: 'purchaseOrderDetailSumaries',
        singleName: 'purchaseOrderDetailSumary',
        loadql : gql`
        query 
        {  
		    purchaseOrderDetailSumaries {
							 id
							 idPurchaseOrderDetail
							 quantity
							 comment
							 dateCreated
							 price
							 amount
							 qtyShipped
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              purchaseOrderDetailSumary($sid: Int!) {
                  purchaseOrderDetailSumary(sid: $sid) { 
	
								 id
							 idPurchaseOrderDetail
							 quantity
							 comment
							 dateCreated
							 price
							 amount
							 qtyShipped
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PurchaseOrderDetailSumaryInputQL!){ savepurchaseorderdetailsumary(value: $evalue) { 
				 id
							 idPurchaseOrderDetail
							 quantity
							 comment
							 dateCreated
							 price
							 amount
							 qtyShipped
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletepurchaseorderdetailsumary(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   purchaseorderdetailsumaryproperty = {
        saveName: 'savepurchaseorderdetailsumaryproperty',
        deleteName: 'deletepurchaseorderdetailsumaryproperty',
        listName: 'purchaseOrderDetailSumaryProperties',
        singleName: 'purchaseOrderDetailSumaryProperty',
        loadql : gql`
        query 
        {  
		    purchaseOrderDetailSumaryProperties {
							 id
							 idPurchaseOrderDetailSumary
							 idProperty
							 propertyValue
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              purchaseOrderDetailSumaryProperty($sid: Int!) {
                  purchaseOrderDetailSumaryProperty(sid: $sid) { 
	
								 id
							 idPurchaseOrderDetailSumary
							 idProperty
							 propertyValue
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PurchaseOrderDetailSumaryPropertyInputQL!){ savepurchaseorderdetailsumaryproperty(value: $evalue) { 
				 id
							 idPurchaseOrderDetailSumary
							 idProperty
							 propertyValue
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletepurchaseorderdetailsumaryproperty(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   purchaseorderdialog = {
        saveName: 'savepurchaseorderdialog',
        deleteName: 'deletepurchaseorderdialog',
        listName: 'purchaseOrderDialogs',
        singleName: 'purchaseOrderDialog',
        loadql : gql`
        query 
        {  
		    purchaseOrderDialogs {
							 id
							 idPurchaseOrder
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              purchaseOrderDialog($sid: Int!) {
                  purchaseOrderDialog(sid: $sid) { 
	
								 id
							 idPurchaseOrder
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PurchaseOrderDialogInputQL!){ savepurchaseorderdialog(value: $evalue) { 
				 id
							 idPurchaseOrder
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletepurchaseorderdialog(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   purchaseorderdocument = {
        saveName: 'savepurchaseorderdocument',
        deleteName: 'deletepurchaseorderdocument',
        listName: 'purchaseOrderDocuments',
        singleName: 'purchaseOrderDocument',
        loadql : gql`
        query 
        {  
		    purchaseOrderDocuments {
							 id
							 idPurchaseOrderDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              purchaseOrderDocument($sid: Int!) {
                  purchaseOrderDocument(sid: $sid) { 
	
								 id
							 idPurchaseOrderDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:PurchaseOrderDocumentInputQL!){ savepurchaseorderdocument(value: $evalue) { 
				 id
							 idPurchaseOrderDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletepurchaseorderdocument(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationfromsupplier = {
        saveName: 'savequotationfromsupplier',
        deleteName: 'deletequotationfromsupplier',
        listName: 'quotationFromSuppliers',
        singleName: 'quotationFromSupplier',
        loadql : gql`
        query 
        {  
		    quotationFromSuppliers {
							 id
							 idOpportunity
							 idCurrency
							 idMill
							 idPort
							 idCountryOrigin
							 idStatus
							 dateReceived
							 idUser
							 idIncoTerm
							 idLinerTerm
							 quoteNotes
							 asImporter
							 idTransactionFlow
							 offerValidity
							 shipmentOffered
							 idDocType
							 dateCreated
							 idTypeOpp
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 subtotal
							 tax
							 taxAmount
							 total
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationFromSupplier($sid: Int!) {
                  quotationFromSupplier(sid: $sid) { 
	
								 id
							 idOpportunity
							 idCurrency
							 idMill
							 idPort
							 idCountryOrigin
							 idStatus
							 dateReceived
							 idUser
							 idIncoTerm
							 idLinerTerm
							 quoteNotes
							 asImporter
							 idTransactionFlow
							 offerValidity
							 shipmentOffered
							 idDocType
							 dateCreated
							 idTypeOpp
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 subtotal
							 tax
							 taxAmount
							 total
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationFromSupplierInputQL!){ savequotationfromsupplier(value: $evalue) { 
				 id
							 idOpportunity
							 idCurrency
							 idMill
							 idPort
							 idCountryOrigin
							 idStatus
							 dateReceived
							 idUser
							 idIncoTerm
							 idLinerTerm
							 quoteNotes
							 asImporter
							 idTransactionFlow
							 offerValidity
							 shipmentOffered
							 idDocType
							 dateCreated
							 idTypeOpp
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 subtotal
							 tax
							 taxAmount
							 total
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationfromsupplier(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationfromsupplierdetail = {
        saveName: 'savequotationfromsupplierdetail',
        deleteName: 'deletequotationfromsupplierdetail',
        listName: 'quotationFromSupplierDetails',
        singleName: 'quotationFromSupplierDetail',
        loadql : gql`
        query 
        {  
		    quotationFromSupplierDetails {
							 id
							 idQuotationFromSupplier
							 idProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 dateAdded
							 itemExtended
							 idCustomerProduct
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationFromSupplierDetail($sid: Int!) {
                  quotationFromSupplierDetail(sid: $sid) { 
	
								 id
							 idQuotationFromSupplier
							 idProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 dateAdded
							 itemExtended
							 idCustomerProduct
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationFromSupplierDetailInputQL!){ savequotationfromsupplierdetail(value: $evalue) { 
				 id
							 idQuotationFromSupplier
							 idProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 dateAdded
							 itemExtended
							 idCustomerProduct
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationfromsupplierdetail(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationfromsupplierdetailsumary = {
        saveName: 'savequotationfromsupplierdetailsumary',
        deleteName: 'deletequotationfromsupplierdetailsumary',
        listName: 'quotationFromSupplierDetailSumaries',
        singleName: 'quotationFromSupplierDetailSumary',
        loadql : gql`
        query 
        {  
		    quotationFromSupplierDetailSumaries {
							 id
							 idQuotationFromSupplierDetail
							 quantity
							 comment
							 dateCreated
							 price
							 amount
							 salePrice
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationFromSupplierDetailSumary($sid: Int!) {
                  quotationFromSupplierDetailSumary(sid: $sid) { 
	
								 id
							 idQuotationFromSupplierDetail
							 quantity
							 comment
							 dateCreated
							 price
							 amount
							 salePrice
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationFromSupplierDetailSumaryInputQL!){ savequotationfromsupplierdetailsumary(value: $evalue) { 
				 id
							 idQuotationFromSupplierDetail
							 quantity
							 comment
							 dateCreated
							 price
							 amount
							 salePrice
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationfromsupplierdetailsumary(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationfromsupplierdetailsumaryproperty = {
        saveName: 'savequotationfromsupplierdetailsumaryproperty',
        deleteName: 'deletequotationfromsupplierdetailsumaryproperty',
        listName: 'quotationFromSupplierDetailSumaryProperties',
        singleName: 'quotationFromSupplierDetailSumaryProperty',
        loadql : gql`
        query 
        {  
		    quotationFromSupplierDetailSumaryProperties {
							 id
							 idQuotationFromSupplierDetailSumary
							 idProperty
							 propertyValue
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationFromSupplierDetailSumaryProperty($sid: Int!) {
                  quotationFromSupplierDetailSumaryProperty(sid: $sid) { 
	
								 id
							 idQuotationFromSupplierDetailSumary
							 idProperty
							 propertyValue
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationFromSupplierDetailSumaryPropertyInputQL!){ savequotationfromsupplierdetailsumaryproperty(value: $evalue) { 
				 id
							 idQuotationFromSupplierDetailSumary
							 idProperty
							 propertyValue
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationfromsupplierdetailsumaryproperty(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationfromsupplierdialog = {
        saveName: 'savequotationfromsupplierdialog',
        deleteName: 'deletequotationfromsupplierdialog',
        listName: 'quotationFromSupplierDialogs',
        singleName: 'quotationFromSupplierDialog',
        loadql : gql`
        query 
        {  
		    quotationFromSupplierDialogs {
							 id
							 idQuotationFromSupplier
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationFromSupplierDialog($sid: Int!) {
                  quotationFromSupplierDialog(sid: $sid) { 
	
								 id
							 idQuotationFromSupplier
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationFromSupplierDialogInputQL!){ savequotationfromsupplierdialog(value: $evalue) { 
				 id
							 idQuotationFromSupplier
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationfromsupplierdialog(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationfromsupplierdocument = {
        saveName: 'savequotationfromsupplierdocument',
        deleteName: 'deletequotationfromsupplierdocument',
        listName: 'quotationFromSupplierDocuments',
        singleName: 'quotationFromSupplierDocument',
        loadql : gql`
        query 
        {  
		    quotationFromSupplierDocuments {
							 id
							 idQuotationFromSupplierDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationFromSupplierDocument($sid: Int!) {
                  quotationFromSupplierDocument(sid: $sid) { 
	
								 id
							 idQuotationFromSupplierDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationFromSupplierDocumentInputQL!){ savequotationfromsupplierdocument(value: $evalue) { 
				 id
							 idQuotationFromSupplierDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationfromsupplierdocument(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationtocustomer = {
        saveName: 'savequotationtocustomer',
        deleteName: 'deletequotationtocustomer',
        listName: 'quotationToCustomers',
        singleName: 'quotationToCustomer',
        loadql : gql`
        query 
        {  
		    quotationToCustomers {
							 id
							 idDocType
							 idQuotationFromSupplier
							 idIncoTerm
							 idLinerTerm
							 idMill
							 idCountry
							 idPort
							 idCurrency
							 idStatus
							 dateSend
							 dateCreated
							 idUser
							 offerValidity
							 shipmentOffered
							 quoteNotes
							 asImporter
							 idTypeOpp
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 subtotal
							 tax
							 taxAmount
							 total
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationToCustomer($sid: Int!) {
                  quotationToCustomer(sid: $sid) { 
	
								 id
							 idDocType
							 idQuotationFromSupplier
							 idIncoTerm
							 idLinerTerm
							 idMill
							 idCountry
							 idPort
							 idCurrency
							 idStatus
							 dateSend
							 dateCreated
							 idUser
							 offerValidity
							 shipmentOffered
							 quoteNotes
							 asImporter
							 idTypeOpp
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 subtotal
							 tax
							 taxAmount
							 total
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationToCustomerInputQL!){ savequotationtocustomer(value: $evalue) { 
				 id
							 idDocType
							 idQuotationFromSupplier
							 idIncoTerm
							 idLinerTerm
							 idMill
							 idCountry
							 idPort
							 idCurrency
							 idStatus
							 dateSend
							 dateCreated
							 idUser
							 offerValidity
							 shipmentOffered
							 quoteNotes
							 asImporter
							 idTypeOpp
							 creditDays
							 interestRate
							 idDeliveryPoint
							 isAutomotive
							 subtotal
							 tax
							 taxAmount
							 total
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationtocustomer(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationtocustomerdetail = {
        saveName: 'savequotationtocustomerdetail',
        deleteName: 'deletequotationtocustomerdetail',
        listName: 'quotationToCustomerDetails',
        singleName: 'quotationToCustomerDetail',
        loadql : gql`
        query 
        {  
		    quotationToCustomerDetails {
							 id
							 idQuotationToCustomer
							 idProduct
							 idCustomerProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 itemExtended
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationToCustomerDetail($sid: Int!) {
                  quotationToCustomerDetail(sid: $sid) { 
	
								 id
							 idQuotationToCustomer
							 idProduct
							 idCustomerProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 itemExtended
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationToCustomerDetailInputQL!){ savequotationtocustomerdetail(value: $evalue) { 
				 id
							 idQuotationToCustomer
							 idProduct
							 idCustomerProduct
							 itemDescription
							 itemQuantity
							 itemPrice
							 itemExtended
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationtocustomerdetail(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationtocustomerdetailsumary = {
        saveName: 'savequotationtocustomerdetailsumary',
        deleteName: 'deletequotationtocustomerdetailsumary',
        listName: 'quotationToCustomerDetailSumaries',
        singleName: 'quotationToCustomerDetailSumary',
        loadql : gql`
        query 
        {  
		    quotationToCustomerDetailSumaries {
							 id
							 idQuotationToCustomerDetail
							 quantity
							 comment
							 itemPrice
							 expenseSupplierSide_Cost
							 expenseSMIM_Cost
							 profit
							 salesPriceBased
							 salePrice
							 expectedProfit
							 dateCreated
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationToCustomerDetailSumary($sid: Int!) {
                  quotationToCustomerDetailSumary(sid: $sid) { 
	
								 id
							 idQuotationToCustomerDetail
							 quantity
							 comment
							 itemPrice
							 expenseSupplierSide_Cost
							 expenseSMIM_Cost
							 profit
							 salesPriceBased
							 salePrice
							 expectedProfit
							 dateCreated
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationToCustomerDetailSumaryInputQL!){ savequotationtocustomerdetailsumary(value: $evalue) { 
				 id
							 idQuotationToCustomerDetail
							 quantity
							 comment
							 itemPrice
							 expenseSupplierSide_Cost
							 expenseSMIM_Cost
							 profit
							 salesPriceBased
							 salePrice
							 expectedProfit
							 dateCreated
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationtocustomerdetailsumary(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationtocustomerdetailsumaryproperty = {
        saveName: 'savequotationtocustomerdetailsumaryproperty',
        deleteName: 'deletequotationtocustomerdetailsumaryproperty',
        listName: 'quotationToCustomerDetailSumaryProperties',
        singleName: 'quotationToCustomerDetailSumaryProperty',
        loadql : gql`
        query 
        {  
		    quotationToCustomerDetailSumaryProperties {
							 id
							 idQuotationToCustomerDetailSumary
							 idProperty
							 propertyValue
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationToCustomerDetailSumaryProperty($sid: Int!) {
                  quotationToCustomerDetailSumaryProperty(sid: $sid) { 
	
								 id
							 idQuotationToCustomerDetailSumary
							 idProperty
							 propertyValue
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationToCustomerDetailSumaryPropertyInputQL!){ savequotationtocustomerdetailsumaryproperty(value: $evalue) { 
				 id
							 idQuotationToCustomerDetailSumary
							 idProperty
							 propertyValue
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationtocustomerdetailsumaryproperty(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationtocustomerdialog = {
        saveName: 'savequotationtocustomerdialog',
        deleteName: 'deletequotationtocustomerdialog',
        listName: 'quotationToCustomerDialogs',
        singleName: 'quotationToCustomerDialog',
        loadql : gql`
        query 
        {  
		    quotationToCustomerDialogs {
							 id
							 idQuotationToCustomer
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationToCustomerDialog($sid: Int!) {
                  quotationToCustomerDialog(sid: $sid) { 
	
								 id
							 idQuotationToCustomer
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationToCustomerDialogInputQL!){ savequotationtocustomerdialog(value: $evalue) { 
				 id
							 idQuotationToCustomer
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationtocustomerdialog(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   quotationtocustomerdocument = {
        saveName: 'savequotationtocustomerdocument',
        deleteName: 'deletequotationtocustomerdocument',
        listName: 'quotationToCustomerDocuments',
        singleName: 'quotationToCustomerDocument',
        loadql : gql`
        query 
        {  
		    quotationToCustomerDocuments {
							 id
							 idQuotationToCustomerDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              quotationToCustomerDocument($sid: Int!) {
                  quotationToCustomerDocument(sid: $sid) { 
	
								 id
							 idQuotationToCustomerDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:QuotationToCustomerDocumentInputQL!){ savequotationtocustomerdocument(value: $evalue) { 
				 id
							 idQuotationToCustomerDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletequotationtocustomerdocument(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   railspur = {
        saveName: 'saverailspur',
        deleteName: 'deleterailspur',
        listName: 'railSpurs',
        singleName: 'railSpur',
        loadql : gql`
        query 
        {  
		    railSpurs {
							 id
							 idRailSpurType
							 name
							 street
							 number
							 idColony
							 phone
							 rFC
							 station
							 zona
							 railSpur1
							 idRailway
							 carsPerDay
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              railSpur($sid: Int!) {
                  railSpur(sid: $sid) { 
	
								 id
							 idRailSpurType
							 name
							 street
							 number
							 idColony
							 phone
							 rFC
							 station
							 zona
							 railSpur1
							 idRailway
							 carsPerDay
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:RailSpurInputQL!){ saverailspur(value: $evalue) { 
				 id
							 idRailSpurType
							 name
							 street
							 number
							 idColony
							 phone
							 rFC
							 station
							 zona
							 railSpur1
							 idRailway
							 carsPerDay
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleterailspur(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   railspurtype = {
        saveName: 'saverailspurtype',
        deleteName: 'deleterailspurtype',
        listName: 'railSpurTypes',
        singleName: 'railSpurType',
        loadql : gql`
        query 
        {  
		    railSpurTypes {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              railSpurType($sid: Int!) {
                  railSpurType(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:RailSpurTypeInputQL!){ saverailspurtype(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleterailspurtype(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   railway = {
        saveName: 'saverailway',
        deleteName: 'deleterailway',
        listName: 'railways',
        singleName: 'railway',
        loadql : gql`
        query 
        {  
		    railways {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              railway($sid: Int!) {
                  railway(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:RailwayInputQL!){ saverailway(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleterailway(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   responsible = {
        saveName: 'saveresponsible',
        deleteName: 'deleteresponsible',
        listName: 'responsibles',
        singleName: 'responsible',
        loadql : gql`
        query 
        {  
		    responsibles {
							 id
							 name
							 officePhone
							 cellPhone
							 eMail
							 idPosition
							 rspUserCredential
							 isActive
							 idUser
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              responsible($sid: Int!) {
                  responsible(sid: $sid) { 
	
								 id
							 name
							 officePhone
							 cellPhone
							 eMail
							 idPosition
							 rspUserCredential
							 isActive
							 idUser
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ResponsibleInputQL!){ saveresponsible(value: $evalue) { 
				 id
							 name
							 officePhone
							 cellPhone
							 eMail
							 idPosition
							 rspUserCredential
							 isActive
							 idUser
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteresponsible(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   responsibletarget = {
        saveName: 'saveresponsibletarget',
        deleteName: 'deleteresponsibletarget',
        listName: 'responsibleTargets',
        singleName: 'responsibleTarget',
        loadql : gql`
        query 
        {  
		    responsibleTargets {
							 id
							 idResponsible
							 idFamily
							 responsibleTargetYear
							 targetQty
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              responsibleTarget($sid: Int!) {
                  responsibleTarget(sid: $sid) { 
	
								 id
							 idResponsible
							 idFamily
							 responsibleTargetYear
							 targetQty
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ResponsibleTargetInputQL!){ saveresponsibletarget(value: $evalue) { 
				 id
							 idResponsible
							 idFamily
							 responsibleTargetYear
							 targetQty
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteresponsibletarget(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   sector = {
        saveName: 'savesector',
        deleteName: 'deletesector',
        listName: 'sectors',
        singleName: 'sector',
        loadql : gql`
        query 
        {  
		    sectors {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              sector($sid: Int!) {
                  sector(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:SectorInputQL!){ savesector(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletesector(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   shipping = {
        saveName: 'saveshipping',
        deleteName: 'deleteshipping',
        listName: 'shippings',
        singleName: 'shipping',
        loadql : gql`
        query 
        {  
		    shippings {
							 id
							 shipDate
							 idStatus
							 idCurrency
							 idCustomer
							 bLNumber
							 bLDate
							 eTA
							 eTD
							 aDA
							 vesselName
							 idPort
							 idMill
							 idCountryOrigin
							 idIncoTerm
							 idLinerTerm
							 idDeliveryPoint
							 idUser
							 shipNotes
							 isAutomotive
							 idDocType
							 subtotal
							 tax
							 taxAmount
							 total
							 idResponsible
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              shipping($sid: Int!) {
                  shipping(sid: $sid) { 
	
								 id
							 shipDate
							 idStatus
							 idCurrency
							 idCustomer
							 bLNumber
							 bLDate
							 eTA
							 eTD
							 aDA
							 vesselName
							 idPort
							 idMill
							 idCountryOrigin
							 idIncoTerm
							 idLinerTerm
							 idDeliveryPoint
							 idUser
							 shipNotes
							 isAutomotive
							 idDocType
							 subtotal
							 tax
							 taxAmount
							 total
							 idResponsible
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ShippingInputQL!){ saveshipping(value: $evalue) { 
				 id
							 shipDate
							 idStatus
							 idCurrency
							 idCustomer
							 bLNumber
							 bLDate
							 eTA
							 eTD
							 aDA
							 vesselName
							 idPort
							 idMill
							 idCountryOrigin
							 idIncoTerm
							 idLinerTerm
							 idDeliveryPoint
							 idUser
							 shipNotes
							 isAutomotive
							 idDocType
							 subtotal
							 tax
							 taxAmount
							 total
							 idResponsible
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteshipping(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   shippingdetail = {
        saveName: 'saveshippingdetail',
        deleteName: 'deleteshippingdetail',
        listName: 'shippingDetails',
        singleName: 'shippingDetail',
        loadql : gql`
        query 
        {  
		    shippingDetails {
							 id
							 idShipping
							 idPurchaseOrder
							 idPurchaseOrderDetail
							 idPurchaseOrderDetailSumary
							 shipQty
							 shipPrice
							 extended
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              shippingDetail($sid: Int!) {
                  shippingDetail(sid: $sid) { 
	
								 id
							 idShipping
							 idPurchaseOrder
							 idPurchaseOrderDetail
							 idPurchaseOrderDetailSumary
							 shipQty
							 shipPrice
							 extended
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ShippingDetailInputQL!){ saveshippingdetail(value: $evalue) { 
				 id
							 idShipping
							 idPurchaseOrder
							 idPurchaseOrderDetail
							 idPurchaseOrderDetailSumary
							 shipQty
							 shipPrice
							 extended
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteshippingdetail(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   shippingdialog = {
        saveName: 'saveshippingdialog',
        deleteName: 'deleteshippingdialog',
        listName: 'shippingDialogs',
        singleName: 'shippingDialog',
        loadql : gql`
        query 
        {  
		    shippingDialogs {
							 id
							 idShipping
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              shippingDialog($sid: Int!) {
                  shippingDialog(sid: $sid) { 
	
								 id
							 idShipping
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ShippingDialogInputQL!){ saveshippingdialog(value: $evalue) { 
				 id
							 idShipping
							 idAction
							 dateDialog
							 idResponsible
							 toContact
							 idContact
							 idCustomerContact
							 dNotes
							 emailSended
							 dateSend
							 subject
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteshippingdialog(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   shippingdialogdocument = {
        saveName: 'saveshippingdialogdocument',
        deleteName: 'deleteshippingdialogdocument',
        listName: 'shippingDialogDocuments',
        singleName: 'shippingDialogDocument',
        loadql : gql`
        query 
        {  
		    shippingDialogDocuments {
							 id
							 idShippingDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              shippingDialogDocument($sid: Int!) {
                  shippingDialogDocument(sid: $sid) { 
	
								 id
							 idShippingDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:ShippingDialogDocumentInputQL!){ saveshippingdialogdocument(value: $evalue) { 
				 id
							 idShippingDialog
							 idDocumentType
							 dateUploaded
							 docName
							 dNotes
							 docId
							 parentFolder
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteshippingdialogdocument(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   state = {
        saveName: 'savestate',
        deleteName: 'deletestate',
        listName: 'states',
        singleName: 'state',
        loadql : gql`
        query 
        {  
		    states {
							 id
							 idCountry
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              state($sid: Int!) {
                  state(sid: $sid) { 
	
								 id
							 idCountry
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:StateInputQL!){ savestate(value: $evalue) { 
				 id
							 idCountry
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletestate(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   supplier = {
        saveName: 'savesupplier',
        deleteName: 'deletesupplier',
        listName: 'suppliers',
        singleName: 'supplier',
        loadql : gql`
        query 
        {  
		    suppliers {
							 id
							 shortName
							 name
							 idCountry
							 isActive
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              supplier($sid: Int!) {
                  supplier(sid: $sid) { 
	
								 id
							 shortName
							 name
							 idCountry
							 isActive
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:SupplierInputQL!){ savesupplier(value: $evalue) { 
				 id
							 shortName
							 name
							 idCountry
							 isActive
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletesupplier(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   suppliercontact = {
        saveName: 'savesuppliercontact',
        deleteName: 'deletesuppliercontact',
        listName: 'supplierContacts',
        singleName: 'supplierContact',
        loadql : gql`
        query 
        {  
		    supplierContacts {
							 id
							 idSupplier
							 name
							 eMail
							 cellPhone
							 officePhone
							 department
							 isActive
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              supplierContact($sid: Int!) {
                  supplierContact(sid: $sid) { 
	
								 id
							 idSupplier
							 name
							 eMail
							 cellPhone
							 officePhone
							 department
							 isActive
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:SupplierContactInputQL!){ savesuppliercontact(value: $evalue) { 
				 id
							 idSupplier
							 name
							 eMail
							 cellPhone
							 officePhone
							 department
							 isActive
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletesuppliercontact(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   templateemail = {
        saveName: 'savetemplateemail',
        deleteName: 'deletetemplateemail',
        listName: 'templateEMails',
        singleName: 'templateEMail',
        loadql : gql`
        query 
        {  
		    templateEMails {
							 id
							 name
							 eMailSubject
							 eMailBody
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              templateEMail($sid: Int!) {
                  templateEMail(sid: $sid) { 
	
								 id
							 name
							 eMailSubject
							 eMailBody
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:TemplateEMailInputQL!){ savetemplateemail(value: $evalue) { 
				 id
							 name
							 eMailSubject
							 eMailBody
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletetemplateemail(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   templatemaildocument = {
        saveName: 'savetemplatemaildocument',
        deleteName: 'deletetemplatemaildocument',
        listName: 'templateMailDocuments',
        singleName: 'templateMailDocument',
        loadql : gql`
        query 
        {  
		    templateMailDocuments {
							 id
							 idTemplate
							 idDocumentType
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              templateMailDocument($sid: Int!) {
                  templateMailDocument(sid: $sid) { 
	
								 id
							 idTemplate
							 idDocumentType
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:TemplateMailDocumentInputQL!){ savetemplatemaildocument(value: $evalue) { 
				 id
							 idTemplate
							 idDocumentType
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletetemplatemaildocument(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   tender = {
        saveName: 'savetender',
        deleteName: 'deletetender',
        listName: 'tenders',
        singleName: 'tender',
        loadql : gql`
        query 
        {  
		    tenders {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              tender($sid: Int!) {
                  tender(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:TenderInputQL!){ savetender(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletetender(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   transactionflow = {
        saveName: 'savetransactionflow',
        deleteName: 'deletetransactionflow',
        listName: 'transactionFlows',
        singleName: 'transactionFlow',
        loadql : gql`
        query 
        {  
		    transactionFlows {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              transactionFlow($sid: Int!) {
                  transactionFlow(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:TransactionFlowInputQL!){ savetransactionflow(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletetransactionflow(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   typeopportunity = {
        saveName: 'savetypeopportunity',
        deleteName: 'deletetypeopportunity',
        listName: 'typeOpportunities',
        singleName: 'typeOpportunity',
        loadql : gql`
        query 
        {  
		    typeOpportunities {
							 id
							 name
							 description
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              typeOpportunity($sid: Int!) {
                  typeOpportunity(sid: $sid) { 
	
								 id
							 name
							 description
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:TypeOpportunityInputQL!){ savetypeopportunity(value: $evalue) { 
				 id
							 name
							 description
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deletetypeopportunity(sid: $evalue) { id  } }
         `,
      
    };
  
    	

   user = {
        saveName: 'saveuser',
        deleteName: 'deleteuser',
        listName: 'users',
        singleName: 'user',
        loadql : gql`
        query 
        {  
		    users {
							 id
							 userName
							 userPassword
							 isActive
							 isAdmin
							 name
							 eMail
					
		     } 
		}
      `,    
       loadentity : gql`
        query 
              user($sid: Int!) {
                  user(sid: $sid) { 
	
								 id
							 userName
							 userPassword
							 isActive
							 isAdmin
							 name
							 eMail
			

				  } 
              }
      `,
    
      mutation : gql`
         mutation savemdata($evalue:UserInputQL!){ saveuser(value: $evalue) { 
				 id
							 userName
							 userPassword
							 isActive
							 isAdmin
							 name
							 eMail
					 
		 
		 } }
         `,
      delete : gql`
         mutation deletemdata($evalue:Int!){ deleteuser(sid: $evalue) { id  } }
         `,
      
    };



}




