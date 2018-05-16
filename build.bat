
// Production
ng build --prod --env=prod --base-href="/v2/crm/" 

// QA
ng build --prod --env=qa --base-href="/qa/crm/"


// Local
ng build --prod --env=local 


// install packages with yarn
yarn install --ignore-engines


// Reseed quotes
DELETE FROM Shipping;
GO
delete from PurchaseOrder;
GO
delete from QuotationToCustomer;
GO
delete from QuotationFromSupplier;
GO
delete from Opportunity;
GO

DBCC CHECKIDENT ('Shipping', RESEED, 500000000);
DBCC CHECKIDENT ('PurchaseOrder', RESEED, 400000000);
DBCC CHECKIDENT ('QuotationToCustomer', RESEED, 300000000);
DBCC CHECKIDENT ('QuotationFromSupplier', RESEED, 200000000);
DBCC CHECKIDENT ('Opportunity', RESEED, 100000000);
GO