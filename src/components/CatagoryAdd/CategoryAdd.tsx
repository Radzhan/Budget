import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { editCategory, editOneType, setCategory } from '../../store/transactions';

const CategoryAdd = () => {
    const {id} = useParams();
    const location = useLocation();
    const category = useAppSelector(editOneType)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [type, setType] = useState({
        title: '',
        type: '',
    });

    const stringLocation = '/categories/' + id

    useEffect(() => {
        if (location.pathname === stringLocation) {
            setType(category)
        }
    } , [category, location.pathname, stringLocation])

    const onDishChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setType(prev => ({ ...prev, [name]: value }));
    };

    let onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (id !== undefined){
            const objectForEdit = {
                id,
                item: type,
            }
            await dispatch(editCategory(objectForEdit))
        } else {
            await dispatch(setCategory(type));
        }

        navigate('/')
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3 d-flex">
                    <label htmlFor="inputTitlte" className="form-label me-5">Title</label>
                    <div className="col-sm-10">
                        <input type="text" name='title' className="form-control" id="inputTitle"
                            value={type.title}
                            onChange={onDishChange} />
                    </div>
                </div>
                <div className="mb-3 d-flex">
                    <label htmlFor="inputPrice" className="form-label me-5">Type</label>
                    <select name="type" id="inputPrice" value={type.type} onChange={onDishChange} required>
                        <option disabled value="">Chouse the category</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <button className='btn btn-primary'>Create</button>
            </form>
        </div>
    );
};

export default CategoryAdd;



