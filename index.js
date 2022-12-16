// Your code here
const createEmployeeRecord = function(array){
    const eRecord = {
        firstName:`${array[0]}`,
        familyName:`${array[1]}`,
        title:`${array[2]}`,
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[]

    }
    return eRecord
}

function createEmployeeRecords(data){
    const obj = []
    for(let i =0 ; i <data.length; i++){
        obj.push(createEmployeeRecord(data[i]))
    }
    return obj
}

function createTimeInEvent(employee, date){
    
    const timeStamp = date.split(" ")

    const timeInObj = {
        type:"TimeIn",
        hour:+timeStamp[1],
        date:timeStamp[0]
    };

    employee.timeInEvents.push(timeInObj);
    return employee

}


function createTimeOutEvent(employe,date){


    const timeStamp = date.split(" ")

    const timeOutObj = {
        type: "TimeOut",
        hour: +timeStamp[1],
        date: timeStamp[0]
    };

    employe.timeOutEvents.push(timeOutObj);
    return employe
}


function hoursWorkedOnDate(employee,date){


    const timeIn = employee.timeInEvents.find(obj => obj.date===date)
    const timeOut = employee.timeOutEvents.find(obj=> obj.date===date)

    return (timeOut.hour-timeIn.hour)/100



}

function wagesEarnedOnDate(employee,date){

    // const timeIn = employee.timeInEvents.find(obj => obj.date===date)
    // const timeOut = employee.timeOutEvents.find(obj=> obj.date===date)

    // const hoursWorked =(timeOut.hour-timeIn.hour)/100

    // return hoursWorked*(employee.payPerHour)

    return hoursWorkedOnDate(employee,date)*(employee.payPerHour)





}

function allWagesFor(employee){
    let wages = 0;
    wages = employee.timeOutEvents.reduce((acc,item)=>{
        const theDate = item.date;
        return (acc+ wagesEarnedOnDate(employee,theDate));
    },0)
    return wages;
}


function calculatePayroll(employees){
    return (employees.reduce((acc,item)=>{
        return (acc+allWagesFor(item))
    },0))
}






