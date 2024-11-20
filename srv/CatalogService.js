module.exports = cds.service.impl( async function(){

    //Step 1: get the object of our odata entities
    const { EmployeeSet, POs } = this.entities;
      
    //Step 2: define generic handler for validation
    this.before('UPDATE', EmployeeSet, (req,res) => {
        console.log("Aa gaya " + req.data.salaryAmount);
        if(parseFloat(req.data.salaryAmount) >= 1000000){
            req.error(500, "Salary must be less than a million for employee");// this is like exception in ABAP
        }
    });
    this.after('READ', EmployeeSet, (data) => {
        data.push({
            "ID": "CUSTOM",
            "nameFirst": "Munna"  
        });
    });
    this.on('boost', async (req,res) => {
        try {
            //Since it is instance bound we will get key of order
            const ID = req.params[0];
            //print the key on the console
            console.log("Hey Amigo, Your purchase order with id " + req.params[0] + " will be boosted");
            //start a db txn using cds query language(cql) - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = cds.tx(req);
            //update dbtab gross amount = current + 20k where ID = key
            await tx.update(POs).with({
                GROSS_AMOUNT: { '+=' : 20000 },
                NOTE: 'Boosted!!'
            }).where(ID);
        } catch (error) {
            return "Error " + error.toString();
        }
    });
    this.on('getOrderValues', async (req,res) => {
        return{
        "OVERALL_STATUS" :'N' };
    }
    );
    this.on('largestOrder', async (req,res) => {
        try {
            const ID = req.params[0];
            const tx = cds.tx(req);
            
            //SELECT * UPTO 1 ROW FROM dbtab ORDER BY GROSS_AMOUNT desc
            const reply = await tx.read(POs).orderBy({
                GROSS_AMOUNT: 'desc'
            }).limit(1);

            return reply;
        } catch (error) {
            return "Error " + error.toString();
        }
    });
}
);