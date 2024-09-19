import React from 'react'
import styles from './Employees.module.scss'
import { useSupabase } from '../../providers/SupabaseProvider'
import { useEffect, useState } from 'react'

export const Employees = () => {
    const { supabase } = useSupabase();
    const [data, setData] = useState([]);

    const getEmployeeData = async () => {
        if(supabase){
            const {data, error} = await supabase
            .from('employees')
            .select('*');
            if(error){
                console.error(error)
            }else{
                setData(data)
            }
        }
    };

    useEffect(() => {
        getEmployeeData()
    },[supabase]);

  return (
    <section className={styles.EmployeeContainer}>
        <h1>Mød vores ansatte</h1>
        <div className={styles.CardContainer}>
        {data && data.map((employee)=>{
            return(
                <div className={styles.EmpCard} key={employee.id}>
                
                    <img src={employee.image_url} alt="employeeImg" />
                
                <div className={styles.EmpCardInfo}>
                <h3>{employee.firstname} {employee.lastname}</h3>
                <p>{employee.position}</p>
                <p>Email : {employee.email}</p>
                <p>Phone : {employee.phone}</p>
                </div>
                </div>
            );
        })}
        </div>
    </section>
  )
}
