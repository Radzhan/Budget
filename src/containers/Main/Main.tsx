import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CardMain from '../../components/CardMain/CardMain';
import { getTransactionAndCategory, mainArray } from '../../store/transactions';

const Main = () => {
    const dispatch = useAppDispatch();
    const Main = useAppSelector(mainArray)

    const getMainArray = useCallback(async () => {
        await dispatch(getTransactionAndCategory())
    }, [dispatch]);

    useEffect(() => {
        getMainArray().catch(console.error)
    }, [getMainArray]);

    const totalPrice = Main.reduce((sum, cardDish) => {
        if (cardDish.type === 'income'){
            return sum + cardDish.amounte;
        } else {
            return sum - cardDish.amounte;
        }
    }, 0);

    const createMain = Main.map(arr => {
        return <CardMain id={arr.id} key={arr.id} date={arr.date} amounte={arr.amounte} title={arr.title} type={arr.type} />
    });

    return (
        <div>
            <b>Total: {totalPrice}</b>
            {createMain}
        </div>
    );
};

export default Main;