import React, { useEffect, useState } from 'react'
import styles from './Review.module.scss'
import { useSupabase } from "../../providers/SupabaseProvider";
import { useAuth } from '../../providers/AuthProvider'
import { useForm } from "react-hook-form"

export const Review = () => {
    const { supabase } = useSupabase(); 
    const { loginData } = useAuth(); 
    const [submitted, setSubmitted] = useState(false); 
    const [reviews, setReviews] = useState([]); 
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [showModal, setShowModal] = useState(false); 
    const [feedbackMessage, setFeedbackMessage] = useState(''); 

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(); 

    
    const defaultReview = {
        title: 'Fandt drømmehuset...',
        content: '"Homelands hjalp os med at finde vores drømmehus i 2018. Efter at vi havde prøvet to andre mæglere lykkedes det dem at sælge vores gamle hus på under tre måneder. Både service og pris var helt i top"',
        name: 'Anna Hattevej',
        date: 'August 2019',
    };

    
    const getReviews = async () => {
        if (supabase) {
            const { data, error } = await supabase
                .from('reviews')
                .select('name, title, content, created_at')
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching reviews:', error);
            } else {
                setReviews(data); 
                setCurrentReviewIndex(0);
            }
        }
    };

    
    const createReview = async (formdata) => {
        if (!loginData || !loginData.user) {
            setFeedbackMessage('Du skal være logget ind for at kunne skrive en anmeldelse.');
            return;
        }
        if (supabase) {
            const { data, error } = await supabase
                .from('reviews')
                .insert([
                    {
                        user_id: loginData.user.id, 
                        name: formdata.name,
                        title: formdata.title,
                        content: formdata.content,
                    }
                ]);
            if (error) {
                console.error('Error inserting review:', error);
                setFeedbackMessage('Noget gik galt, prøv igen senere.'); 
            } else {
                setSubmitted(true); 
                setFeedbackMessage('Anmeldelse sendt!'); 
                getReviews(); 
                setShowModal(false); 
            }
        }
    };

   
    useEffect(() => {
        getReviews();
    }, []);

    
    useEffect(() => {
        if (reviews.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentReviewIndex(prevIndex => {
                    const nextIndex = prevIndex + 1;
                    if (nextIndex >= reviews.length) {
                        return 0; 
                    }
                    return nextIndex; 
                });
                
            }, 8000); 

            return () => clearInterval(intervalId);
        }
    }, [reviews]);

    return (
        <section className={styles.ReviewMain}>

            <h1>Det her siger vores kunder</h1>

            <div className={styles.DisplayReview}>
                {reviews.length > 0 ? (
                    <div>
                        <h6>{reviews[currentReviewIndex].title}</h6>
                        <p>"{reviews[currentReviewIndex].content}"</p>
                        <p>{reviews[currentReviewIndex].name}, {new Date(reviews[currentReviewIndex].created_at).toLocaleDateString('da-DK', { year: 'numeric', month: 'long' })}</p>
                    </div>
                ) : (
                    <div>
                        <h6>{defaultReview.title}</h6>
                        <p>{defaultReview.content}</p>
                        <p>{defaultReview.name}, {defaultReview.date}</p>
                    </div>
                )}
            </div>

            <div className={styles.writeReview}>
                <div className={styles.OpenModalBtn}>
                <button onClick={() => setShowModal(true)}>Skriv en anmeldelse</button>
                </div>
                <div>
                {showModal && (
                    <div className={styles.modal}>
                        <form noValidate onSubmit={handleSubmit(createReview)}>
                            <div className={styles.closeModal}>
                            <button onClick={() => setShowModal(false)}>X</button>
                            </div>
                            <input
                                type="text"
                                id='name'
                                placeholder='Indtast dit navn'
                                {...register("name", {
                                    required: 'Du skal udfylde feltet',
                                })}
                            />
                            <input
                                id='title'
                                type="text"
                                placeholder="Indtast titel for din anmeldelse"
                                {...register("title", {
                                    required: 'Du skal udfylde feltet',
                                })}
                            />
                            <textarea
                                id='content'
                                placeholder="Skriv din anmeldelse her"
                                {...register("content", {
                                    required: 'Du skal udfylde feltet',
                                })}
                            />
                            <div className={styles.submitBtn}>
                            <button type='submit'>Send</button>
                            {feedbackMessage && <p>{feedbackMessage}</p>} 
                            </div>
                        </form>
                        
                        
                    </div>
                )}
                </div>
            </div>

        </section>
    );
}

