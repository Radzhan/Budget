import React, { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { categoryArray, deleteCategory, getCategory, getOneType } from '../../store/transactions';

const Category = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const category = useAppSelector(categoryArray);

    const getArray = useCallback(async () => {
        await dispatch(getCategory());
    }, [dispatch]);

    const editType = async (id: string) => {
        await dispatch(getOneType(id));
    }

    useEffect(() => {
        getArray().catch(console.error);
    }, [getArray]);

    const remove = async (id: string) => {
        await dispatch(deleteCategory(id));
        navigate('/categories');
    };

    const createCategoty = category.map(type => {
        return <div key={type.id} className='d-flex justify-content-between my-3'>
            <p>{type.title}</p>
            <div>
                <b className={type.type === 'income' ? 'text-success' : 'text-danger'}>{type.type}</b>
                <Link to={'/categories/' + type.id} className='btn btn-primary mx-5' onClick={() => editType(type.id)}>Edit</Link>
                <button className='btn btn-danger' onClick={() => remove(type.id)}>Delete</button>
            </div>
        </div>
    });
    return (
        <div>
            <header className='d-flex justify-content-between'>
                <p>Categoryes</p>
                <Link to='/category/add' className='btn btn-primary'>Add</Link>
            </header>
            {createCategoty}

        </div>
    );
};

export default Category;