
interface testimonialType {
    company?: string;
    feedback?: string;
    image?: any;
    name?: string;
    _id?: string;
}

interface brandsType {
    name?: string;
    imgUrl?: any;
    _id?: string;
}


type ActionType =
    | { type: 'SET_BRANDS'; payload: brandsType[] }
    | { type: 'SET_TESTIMONIALS'; payload: testimonialType[] }
    | { type: 'SET_CURRENT_INDEX'; payload: number };


interface State {
    brands: brandsType[];
    testimonials: testimonialType[];
    currentIndex: number;
}


const reducer = (state: State, action: ActionType): State => {
    switch (action.type) {
        case 'SET_BRANDS':
            return { ...state, brands: action.payload };
        case 'SET_TESTIMONIALS':
            return { ...state, testimonials: action.payload };
        case 'SET_CURRENT_INDEX':
            return { ...state, currentIndex: action.payload };
        default:
            return state;
    }
};



import { useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { urlFor, client } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Testimonial.scss";

const Testimonial = () => {

    // const [brands, setBrands] = useState<brandsType[]>([]);
    // const [testimonials, setTestimonials] = useState<testimonialType[]>([]);
    // const [currentIndex, setCurrentIndex] = useState(0);

    const initialState: State = { brands:[],testimonials: [],currentIndex: 0};
    const [state, dispatch] = useReducer(reducer, initialState);
    const { brands, testimonials, currentIndex } = state;

    const setBrands = (newBrands: brandsType[]) => {
        dispatch({ type: 'SET_BRANDS', payload: newBrands });
      };
    
      const setTestimonials = (newTestimonials: testimonialType[]) => {
        dispatch({ type: 'SET_TESTIMONIALS', payload: newTestimonials });
      };
    
      const setCurrentIndex = (newIndex: number) => {
        dispatch({ type: 'SET_CURRENT_INDEX', payload: newIndex });
      };


    useEffect(() => {
        const query = '*[_type == "testimonials"]';
        const brandsQuery = '*[_type == "brands"]';
        const abortController = new AbortController();


        client.fetch(query, { signal: abortController.signal }).then((data) => {

            setTestimonials(data)

        }).catch((err) => {
            console.log(err);
        })

        client.fetch(brandsQuery, { signal: abortController.signal }).then((data) => {

            setBrands(data)

        }).catch((err) => {
            console.log(err);
        })

        return () => {
            abortController.abort();
        }

    }, [])

    const handleClick = (index: number) => {
        setCurrentIndex(index);
    }

    return (
        <>
            {
                testimonials.length && (
                    <>
                        <div className="app__testimonial-item app__flex">
                            <img src={`${urlFor(testimonials.at(currentIndex)?.image)}`} alt="testimonial" />
                            <div className="app__testimonial-content">
                                <p className="p-text">{testimonials.at(currentIndex)?.feedback}</p>
                                <div>
                                    <h4 className="bold-text">{testimonials.at(currentIndex)?.name}</h4>
                                    <h5 className="p-text">{testimonials.at(currentIndex)?.company}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="app__testimonial-btns app__flex">
                            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
                                <HiChevronLeft />
                            </div>
                            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
                                <HiChevronRight />
                            </div>
                        </div>
                    </>
                )
            }
            <div className="app__testimonial-brands app__flex">
                {brands.map((brand) => (
                    <motion.div whileInView={{ opacity: [0, 1] }} transition={{ duration: 0.5, type: 'tween' }} key={brand._id}>
                        <img src={`${urlFor(brand.imgUrl)}`} alt={brand.name} />
                    </motion.div>
                ))}
            </div>
        </>
    )
}


export default AppWrap(MotionWrap(Testimonial, "app__testimonial"), "testimonial", "app__primarybg");