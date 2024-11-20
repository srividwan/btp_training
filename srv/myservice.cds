service MyService @(path:'MyService') {
    // service definition;
    function greetings(name:String(20)) returns String;
    function product(a: Integer, b: Integer) returns Integer;
}