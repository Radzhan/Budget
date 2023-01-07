import React from 'react';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../app/hooks';
import { deleteTransaction, getTransactionAndCategory } from '../../store/transactions';
import { Link } from 'react-router-dom';


interface Props {
    date: string;
    title: string;
    amounte: number;
    type: string;
    id: string;
}

const CardMain: React.FC<Props> = ({ title, date, type, amounte ,id}) => {
    const dispatch =useAppDispatch();

    const remove = async (id: string) => {
        const confirm = window.confirm('do u wonna delete transaction')
        if (confirm) {
            await dispatch(deleteTransaction(id))
            await dispatch(getTransactionAndCategory())
        }
    }

    return (
        <div className='d-flex justify-content-between my-4'>
            <div>
                <span>{dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</span>
                <span className='mx-4'>{title}</span>
            </div>

            <div>
                <b className={type === 'income' ? 'text-success' : 'text-danger'}>{amounte}</b>
            </div>

            <div>
                <button className='btn btn-danger me-5' onClick={() => remove(id)}>Delete</button>
                <Link to={'/main/' + id} className='btn btn-primary' >Edit</Link>
            </div>
        </div>
    );
};

export default CardMain;