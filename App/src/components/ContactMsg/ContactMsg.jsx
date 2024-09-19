import React, { useEffect, useState } from 'react';
import { useSupabase } from '../../providers/SupabaseProvider';
import { useForm } from 'react-hook-form';
import styles from './ContactMsg.module.scss';

export const ContactMsg = () => {
    const { supabase } = useSupabase(); 
    const [submitted, setSubmitted] = useState(false); 
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [employees, setEmployees] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(); 

    const getEmployees = async () => {
        if (supabase) {
            const { data, error } = await supabase
                .from('employees')
                .select('id, firstname, lastname');
            if (error) {
                console.error('Error fetching employees:', error);
            } else {
                setEmployees(data); 
            }
        }
    };

    useEffect(() => {
        getEmployees();
    }, [supabase]);

    // Submit contact message
    const createContactMsg = async (formData) => {
        if (supabase) {
            const { data, error } = await supabase
                .from('contact_message')
                .insert([
                    {
                        name: formData.name,
                        message: formData.message,
                        employee_id: formData.employee_id,
                        created_at: new Date(), 
                    }
                ]);
            if (error) {
                console.error('Error inserting contact message:', error);
                setFeedbackMessage('Noget gik galt, prøv igen senere.'); 
            } else {
                setSubmitted(true); 
                setFeedbackMessage('Din besked er modtaget!'); 
            }
        }
    };

    return (
        <section className={styles.ContactMsg}>
            
            {submitted ? (
                <p>{feedbackMessage}</p>
            ) : (
                <form onSubmit={handleSubmit(createContactMsg)}>
                    <p>Udfyld og send formularen og vi vil hurtigst muligt besvare dine spørgsmål.</p>

                    <div className={styles.FormField}>
                        <label htmlFor="name">Navn: <span>*</span></label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Navn er påkrævet' })}
                        />
                        {errors.name && <p className={styles.Error}>{errors.name.message}</p>}
                    </div>


                    <div className={styles.FormField}>
                        <label htmlFor="employee">Medarbejder:<span>*</span></label>
                        <select
                            id="employee"
                            {...register('employee_id', { required: 'Vælg en medarbejder' })}
                        >
                            <option value="">-- Vælg medarbejder --</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.firstname} {employee.lastname}
                                </option>
                            ))}
                        </select>
                        {errors.employee_id && <p className={styles.Error}>{errors.employee_id.message}</p>}
                    </div>


                    <div className={styles.FormField}>
                        <label htmlFor="message">Besked:<span>*</span></label>
                        <textarea
                            id="message"
                            {...register('message', { required: 'Besked er påkrævet' })}
                        ></textarea>
                        {errors.message && <p className={styles.Error}>{errors.message.message}</p>}
                    </div>


                    <button type="submit" className={styles.SubmitButton}>Send</button>
                </form>

            )}
            <div className={styles.FindUs}>
                <p>Find os her:</p>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2277.0398029077134!2d9.936914515946936!3d57.032521080927095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464933badbaffce5%3A0xb1b87be60b7b6468!2s%C3%98ster%20Uttrupvej%205%2C%209000%20Aalborg!5e0!3m2!1sen!2sdk!4v1695042218582!5m2!1sen!2sdk" 
                    width="600" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">  
                    </iframe>

            </div>

        </section>
    );
};


