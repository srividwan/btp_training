using { anubhav.db.master,anubhav.db.transaction } from '../db/datamodel';
//using { cappo.cds} from '../db/CDSView';

service CatalogService @(path:'CatalogService', requires: 'authenticated-user') {
@Capabilities : {Deletable : false} 
// draft table enabled by adding keywords in braces in below statement.
entity POs @(odata.draft.enabled:true) as projection on transaction.purchaseorder
{
    *,
    Items,
    case OVERALL_STATUS
     when 'P' then 'Pending'
     when 'N' then 'New'
     when 'A' then 'Approved'
     when 'X' then 'Rejected'
     end as OverallStatus : String(10),
    case OVERALL_STATUS
     when 'P' then 2
     when 'N' then 2
     when 'A' then 3
     when 'X' then 1
     end as ColorCode : Integer,
}
    actions{
        @Common.SideEffects : {  
            TargetProperties: ['in/GROSS_AMOUNT'], // A read call to get GROSS Amount immediately after clicking on boost action button in purchaseorder app
            
        }
      
        action boost() returns POs
};
function largestOrder() returns POs;
function getOrderValues() returns POs;
entity POItems as projection on transaction.poitems;
entity BusinessPartnerSet as projection on master.businesspartner;
entity AddressSet as projection on master.address;
entity ProductSet as projection on master.product;
//@readonly //applying read only restriction on employee data
entity EmployeeSet @(restrict:[
    {grant:['READ'],to:'Viewer', where: 'bankName=$user.BankName'},
    {grant:['WRITE'], to:'Admin'}
])as projection on master.employees;

//entity Products as projection on cds.CDSViews.ProductView;
// entity Items as projection on cds.CDSViews.ItemView;
}