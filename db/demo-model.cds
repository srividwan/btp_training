namespace ust.demo;
using  {ust.reuse as reuse} from './reuse';
using { cuid, managed, temporal } from '@sap/cds/common';

context master {
    entity student: reuse.address{
        key id: reuse.guid;
        nameFirst: String(80);
        nameLast: String(80);
        age: Integer;
  // foreign key @runtime the fieldname will be class_id      
        class : Association to semester;
    }
    entity semester{
        key id: reuse.guid;
        name: String(30);
        specialization: String(30);
        hod:String(10);
    }
    entity books{
        key code:String(04);
        name:localized String(10);
        author: String(50);
    }
}
    context transaction{

        entity subs : cuid, managed, temporal{
       student: Association to one master.student;
       book: Association to one master.books;
        
        }
    }    

    


