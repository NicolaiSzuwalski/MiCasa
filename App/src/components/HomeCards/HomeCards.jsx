import React from 'react'
import { useSupabase } from '../../providers/SupabaseProvider'
import { useEffect, useState } from 'react'
import styles from './HomeCards.module.scss'
import { Link } from 'react-router-dom'


export const HomeCards = () => {
    const { supabase } = useSupabase();
    const [data, setData] = useState([]);

    const numberFormatter = new Intl.NumberFormat('da-DK');

    const getHomeData = async () => {
        if (supabase) {
            const { data, error } = await supabase
                .from('estates')
                .select(`
                    id, 
                    address, 
                    price,
                    num_rooms,
                    floor_space,
                    energy_label_id(
                        id,
                        letter,
                        color
                    ),
                    city_id(
                        zipcode,
                        name
                    ),
                    estate_image_rel (
                        is_primary,
                        images (
                            image_url,
                            description
                        )
                    ),
                    estate_types(
                        name
                    )
                `);
            if (error) {
                console.error(error);
            } else {
                const filteredEstates = data.filter(estate => 
                    estate.estate_image_rel.some(rel => 
                        rel.is_primary
                    )
                );

                const shuffled = filteredEstates.sort(() => 0.5 - Math.random());
                const selectedEstates = shuffled.slice(0, 3);

                setData(selectedEstates);
                console.log(data);
                console.log(selectedEstates)
            }
        }
    };

    useEffect(() => {
        getHomeData();
    }, [supabase]);

    return (
        <section className={styles.HomeCards}>
            {data.map((estate) => {

                const primaryImage = estate.estate_image_rel.find(rel => rel.is_primary)?.images;

                return (
                    <div key={estate.id} className={styles.Card}>
                        {primaryImage && (
                            <img 
                                src={primaryImage.image_url} 
                                alt="EstateImg" 
                            />
                        )}

                        <div className={styles.CardInfo}>
                            <div className={styles.CardHeader}>
                            <h3>{estate.address}</h3>
                            <p className={styles.Label} style={{ backgroundColor: estate.energy_label_id.color }}> {estate.energy_label_id.letter}</p>
                            </div>
                            <p>{estate.city_id.zipcode + ' ' + estate.city_id.name}</p>
                            <p>{estate.estate_types.name}</p>
                            <p>{estate.num_rooms} {estate.num_rooms === 1 ? 'værelse' : 'værelser'}, {estate.floor_space} m2</p>
                            <h2>{numberFormatter.format(estate.price)},00 DKK</h2>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};