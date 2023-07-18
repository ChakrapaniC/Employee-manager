(async function () {
    const data = await fetch('/data.json');
    const res = await data.json();

    console.log(res);

    const list = document.querySelector('.employee-list');
    const employeeInfo = document.querySelector('.employee__single-info');

    let employees = [];
    employees = res;
    console.log(employees);

    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];
    
    //SELECTED EMPLYPEE

    list.addEventListener('click',(e)=>{
     
        if(e.target.tagName ==="SPAN" && selectedEmployeeId !== e.target.id){
            selectedEmployeeId = e.target.id;
            showEmp();
            singleEmp();
            // alert('clicked'+ " "+ e.target.id);

        }
        //Delete Employee logic
        if(e.target.tagName === 'I'){
           employees = employees.filter((i)=> String(i.id) !== e.target.parentNode.id);
           
        }

        if(String(selectedEmployeeId) === e.target.parentNode.id){
            selectedEmployeeId = employees[0]?.id || -1;
            selectedEmployee = employees[0] || {};
            singleEmp();
        }
        //
        showEmp();
    })

   //render employee list
    const showEmp = () => {
        list.innerHTML= '';
        employees.map((e) => {
            const emp = document.createElement('span');
            emp.classList.add("list");
            if (parseInt(selectedEmployeeId, 10) === e.id) {
                emp.classList.add("selected");
                selectedEmployee = e;
                // console.log(selectedEmployee)
            }
            emp.setAttribute("id", e.id);
            
            emp.innerHTML = `${e.firstName} ${e.lastName} <i class="employeeDelete">❌</i>`;
            list.append(emp);
        });
    }
    //render single employee
    const singleEmp = ()=> {

        employeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single--heading">
        ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
        </span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
      `;
    }
    //Add Employee

    const btn = document.querySelector('.btn');
    const newEmployee = document.querySelector('.newEmployee');
    const addEmployee = document.querySelector('.addEmployee_create');
    btn.addEventListener('click', ()=>{
        newEmployee.style.display = "flex";
    });

    newEmployee.addEventListener('click',(e)=>{
        if(e.target.className === "newEmployee"){
        newEmployee.style.display = "none";
        }
    });

    addEmployee.addEventListener('submit',(e)=>{
        e.preventDefault();

        const formData = new FormData(addEmployee); //This creates a new FormData object, which represents the data submitted by the form.
        const values = [... formData.entries()]; // This converts the FormData object into an array of key-value pairs.
        console.log(values)
        let newEmp = {};
        values.map((val)=>{
            newEmp[val[0]] = val[1];
        });

        newEmp.id = employees[employees.length -1].id + 1;
        newEmp.imageUrl = newEmp.imageUrl ||  "https://cdn-icons-png.flaticon.com/512/0/93.png";
        newEmp.age = new Date().getFullYear() - parseInt(newEmp.dob.slice(0,4),10);
        employees.push(newEmp);

        showEmp();
        addEmployee.reset();
        newEmployee.style.display = "none";

    })
    


    if(selectedEmployee) singleEmp();
    showEmp();
})(); 