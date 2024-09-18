import React from 'react'
import { Link } from 'react-router-dom'
import { useSupabase } from '../../providers/SupabaseProvider'
import { useEffect, useState } from 'react'
import styles from './Estates.module.scss'

export const Estates = () => {
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



                setData(filteredEstates);
                console.log(data);
                console.log(filteredEstates);
            }
        }
    };

    useEffect(() => {
        getHomeData();
    }, [supabase]);

    return (
        <>
        <div className={styles.EstateHeader}>
            <h1>Boliger til salg</h1>
            <div className={styles.Selectors}>
            <select name="" id="">
                <option value="" disabled>Sorter</option>
                <option value="">Pris stigende</option>
                <option value="">Pris faldene</option>
                <option value="">Antal kvadratmeter</option>
                <option value="">Liggetid - faldende</option>
            </select>
            <select name="filter">
                <option value="" disabled>Filter</option>
                <option value="Villa">Villa</option>
                <option value="Ejerlejlighed">Ejerlejlighed</option>
                <option value="Andelsbolig">Andelsbolig</option>
            </select>
            </div>
        </div>
            <section className={styles.EstateCards}>
                {data.map((estate) => {

                    const primaryImage = estate.estate_image_rel.find(rel => rel.is_primary)?.images;

                    return (
                        <div key={estate.id} className={styles.Card}>
                            {primaryImage && (
                                <Link to={`./${estate.id}`}>
                                <img 
                                    src={primaryImage.image_url} 
                                    alt="EstateImg" 
                                />
                                </Link>
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
        </>
    );
};
