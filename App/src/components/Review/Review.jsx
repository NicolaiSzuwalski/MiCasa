import React, { useEffect, useState } from 'react'
import styles from './Review.module.scss'
import { useSupabase } from "../../providers/SupabaseProvider";
import { useAuth } from '../../providers/AuthProvider'
import { useForm } from "react-hook-form"

export const Review = () => {
    const { supabase } = useSupabase(); // Get Supabase instance
    const { loginData } = useAuth(); // Get authentication data
    const [submitted, setSubmitted] = useState(false); // Track if review is submitted
    const [reviews, setReviews] = useState([]); // Store fetched reviews
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0); // Index of current review
    const [showModal, setShowModal] = useState(false); // Toggle modal visibility
    const [feedbackMessage, setFeedbackMessage] = useState(''); // Feedback message for user

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(); // Hook form setup

    // Default review to display when no reviews are available
    const defaultReview = {
        title: 'Fandt drømmehuset...',
        content: '"Homelands hjalp os med at finde vores drømmehus i 2018. Efter at vi havde prøvet to andre mæglere lykkedes det dem at sælge vores gamle hus på under tre måneder. Både service og pris var helt i top"',
        name: 'Anna Hattevej',
        date: 'August 2019',
    };

    // Fetch reviews from Supabase
    const getReviews = async () => {
        if (supabase) {
            const { data, error } = await supabase
                .from('reviews')
                .select('name, title, content, created_at')
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching reviews:', error);
            } else {
                setReviews(data); // Set fetched reviews
                setCurrentReviewIndex(0); // Reset review index
            }
        }
    };

    // Create a new review
    const createReview = async (formdata) => {
        if (!loginData || !loginData.user) {
            setFeedbackMessage('Du skal være logget ind for at kunne skrive en anmeldelse.'); // Feedback if not logged in
            return;
        }
        if (supabase) {
            const { data, error } = await supabase
                .from('reviews')
                .insert([
                    {
                        user_id: loginData.user.id, // Set user ID from auth data
                        name: formdata.name,
                        title: formdata.title,
                        content: formdata.content,
                    }
                ]);
            if (error) {
                console.error('Error inserting review:', error);
                setFeedbackMessage('Noget gik galt, prøv igen senere.'); // Error feedback
            } else {
                setSubmitted(true); // Set submission status
                setFeedbackMessage('Anmeldelse sendt!'); // Success feedback
                getReviews(); // Refresh reviews after submission
                setShowModal(false); // Close modal
            }
        }
    };

    // Fetch reviews when component mounts
    useEffect(() => {
        getReviews();
    }, []);

    // Update review display every 10 seconds
    useEffect(() => {
        if (reviews.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentReviewIndex(prevIndex => {
                    const nextIndex = prevIndex + 1;
                    if (nextIndex >= reviews.length) {
                        return 0; // Hvis vi når slutningen, start forfra
                    }
                    return nextIndex; // Ellers gå til næste
                });
                
            }, 8000); 

            return () => clearInterval(intervalId); // Cleanup interval on unmount
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
                            {feedbackMessage && <p>{feedbackMessage}</p>} {/* Display feedback */}
                            </div>
                        </form>
                        
                        
                    </div>
                )}
                </div>
            </div>

        </section>
    );
}

