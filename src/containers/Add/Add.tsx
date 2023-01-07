import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { categoryArray, getCategory, setTransaction } from '../../store/transactions';

const Add = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const category = useAppSelector(categoryArray);
    const [type, setType] = useState({
        category: '',
        type: '',
        amounte: '',
        id: '',
    });

    const now = new Date();

    const createdAt = now.toISOString();

    const getArray = useCallback(async () => {
        await dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        getArray().catch(console.error);
    }, [getArray]);

    const onDishChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setType(prev => ({ ...prev, [name]: value }));
    };

    const object = {
        category: '',
        amounte: Number(type.amounte),
        createdAt: '',
    }

    for (let i = 0; i < category.length; i++) {
        if (category[i].title === type.category && category[i].type === type.type) {
            object.category = category[i].id;
        }
    }

    let onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        object.createdAt = createdAt;
        await dispatch(setTransaction(object));
        navigate('/')
    };

    const createOption = category.map(option => {
        if (type.type === 'income') {
            if (option.type === 'income') {
                return <option key={option.id} value={option.title}>{option.title}</option>
            }
        } else if (type.type === 'expense') {
            if (option.type === 'expense') {
                return <option key={option.id} value={option.title}>{option.title}</option>
            }
        }
    });

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3 d-flex">
                    <label htmlFor="inputPrice" className="form-label me-5">Type</label>
                    <select name="type" id="inputPrice" value={type.type} onChange={onDishChange} required>
                        <option disabled value="">Chouse Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="mb-3 d-flex">
                    <label htmlFor="inputPrice" className="form-label me-5">Category</label>
                    <select name="category" id="inputPrice" value={type.category} onChange={onDishChange} required>
                        <option disabled value="">Chouse the category</option>
                        {createOption}
                    </select>
                </div>
                <div className="mb-3 d-flex">
                    <label htmlFor="inputTitlte" className="form-label me-5">Amount</label>
                    <div className="col-sm-10">
                        <input type="text" name='amounte' className="form-control" id="inputTitle"
                            value={type.amounte}
                            onChange={onDishChange} />
                    </div>
                </div>
                <button className='btn btn-primary'>Create</button>
            </form>
        </div>
    );
};

export default Add;