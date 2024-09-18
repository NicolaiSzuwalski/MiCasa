import React from 'react'
import styles from './EstateDetails.module.scss'
import { useParams } from 'react-router-dom'
import { useSupabase } from '../../providers/SupabaseProvider'
import { useEffect, useState } from 'react'
import Gallery from '../../assets/images/Gallery.png'
import Floorplan from '../../assets/images/Floorplan.png'
import Location from '../../assets/images/Location.png'
import Heart from '../../assets/images/Heart.png'

export const EstateDetails = () => {
    const { supabase } = useSupabase();
    const [data, setData] = useState(null);
    const { estate_id } = useParams();

    const numberFormatter = new Intl.NumberFormat('da-DK');

    const getEstateDetails = async () => {
        if (supabase) {
            const { data, error } = await supabase
                .from('estates')
                .select(`
                    id, 
                    address, 
                    price,
                    payout,
                    gross,
                    net,
                    cost,
                    num_rooms,
                    num_floors,
                    floor_space,
                    ground_space,
                    basement_space,
                    year_construction,
                    year_rebuilt,
                    description,
                    floorplan,
                    num_clicks,
                    type_id(
                        id,
                        name
                    ),
                    created_at,
                    employee_id,
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
                `)
                .eq('id', estate_id)
                .single();

            if (error) {
                console.error(error);
            } else {
                setData(data);
                console.log(data);
            }
        }
    };

    useEffect(() => {
        getEstateDetails();
    }, [supabase]);

    
    let primaryImageUrl = '';

    // If statement til at finde primary image
    if (data && data.estate_image_rel) {
        
        const primaryImageRel = data.estate_image_rel.find(imageRel => imageRel.is_primary);
        if (primaryImageRel && primaryImageRel.images) {
            primaryImageUrl = primaryImageRel.images.image_url;
        }
    }

    return (
        <section className={styles.EstateDetails}>
            <header>
                {primaryImageUrl && <img src={primaryImageUrl} alt="Estate Primary" />}
                <div></div>
            </header>

            {data && (
            <section className={styles.ArticleContainer}>
                <article className={styles.Article1}>
                    <div className={styles.InfoHeaders}>
                        <div className={styles.MainInfo}>
                            <h1>{data.address}</h1>
                            <p>{data.city_id.zipcode} {data.city_id.name}</p>
                            <p>{data.type_id.name + ' | ' }  {data.floor_space + ' m2 | '}  {data.num_rooms + ' vær'}</p>
                            <p>Set {data.num_clicks} gange</p>
                        </div>

                        <div className={styles.InfoClickables}>
                            <img src={Gallery} alt="galleryIcon" />
                            <img src={Floorplan} alt="floorplanIcon" />
                            <img src={Location} alt="locationIcon" />
                            <img src={Heart} alt="heartIcon" />
                            
                        </div>
                            
                        <div className={styles.InfoPrices}>
                            <p>Kontantpris: <span>{numberFormatter.format(data.price)}</span></p>
                            <p>Udbetaling: {numberFormatter.format(data.payout)}</p>
                            <p>Ejerudgift per måned: {data.cost},00</p>
                        </div>
                    </div>
                </article>

                <article className={styles.Article2}>

                </article>

                <article className={styles.Article3}>

                </article>
            </section>
            )}
        </section>
    );
};

