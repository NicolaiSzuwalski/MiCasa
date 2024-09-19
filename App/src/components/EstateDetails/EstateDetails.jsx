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
                    employee_id(
                        id,
                        firstname,
                        lastname,
                        position,
                        image_url,
                        phone,
                        email
                    ),
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

    const daysSinceCreated = data ? Math.floor((new Date() - new Date(data.created_at)) / (1000 * 60 * 60 * 24)) : null;

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
                    <div className={styles.GridThis}>
                        <div className={styles.FlexThis}>
                            <div>
                                <p>Sagsnr.</p>
                                <p>Boligareal</p>
                                <p>Grundareal</p>
                                <p>Antal rum</p>
                                <p>Antal plan</p>
                            </div>
                            <div>
                                <p>{data.id}</p>
                                <p>{data.floor_space} m2</p>
                                <p>{data.ground_space} m2</p>
                                <p>{data.num_rooms}</p>
                                <p>{data.num_floors}</p>
                            </div>
                        </div>
                        <div className={styles.FlexThis}>
                            <div>
                                <p>Kælder</p>
                                <p>Byggeår</p>
                                <p>Ombygget</p>
                                <p>Energimærke</p>
                                <p>Liggetid</p>
                            </div>
                            <div>
                                <p>{data.basement_space}</p>
                                <p>{data.year_construction}</p>
                                <p>{data.year_rebuilt}</p>
                                <p>{data.energy_label_id.letter}</p>
                                <p>{daysSinceCreated} dage</p>
                            </div>
                        </div>
                        <div className={styles.FlexThis}>
                            <div>
                                <p>Kontantpris</p>
                                <p>Udbetaling</p>
                                <p>Brutto ex.ejerudgift</p>
                                <p>Netto ex.ejerudgift</p>
                                <p>Ejerudgift</p>
                            </div>
                            <div>
                                <p>{numberFormatter.format(data.price)}</p>
                                <p>{numberFormatter.format(data.payout)}</p>
                                <p>{numberFormatter.format(data.gross)}</p>
                                <p>{data.net}</p>
                                <p>{data.cost}</p>
                            </div>
                        </div>
                    </div>
                </article>

                <article className={styles.Article3}>
                    <div className={styles.Description}>
                        {data.description}
                    </div>
                    <div className={styles.EmployeeDetails}>
                        <h3>Kontakt</h3>
                        <img src={data.employee_id.image_url} alt="EmployeeImg" />
                        <h1>{data.employee_id.firstname} {data.employee_id.lastname}</h1>
                        <p>{data.employee_id.position}</p>
                        <p>Mobil: {data.employee_id.phone}</p>
                        <p>Email: {data.employee_id.email}</p>
                    </div>
                </article>
            </section>
            )}
        </section>
    );
};

