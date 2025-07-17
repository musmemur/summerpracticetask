import './index.css';
import {CloseSign} from "../shared/CloseSign";
import {AddFriendSign} from "../shared/AddFriendSign";
import React, {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";

export type Friend = {
    FIO: string;
    Email: string;
    Phone: string;
};

export const ModalWindow = () => {
    const [isShowAddFriendForm, setIsShowAddFriendForm] = useState<boolean>(false);
    const [friends, setFriends] = useState<Friend[]>([]);
    const {handleSubmit, register} = useForm<Friend>();

    const showAddFriendForm = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsShowAddFriendForm(!isShowAddFriendForm);
    }

    const addFriend: SubmitHandler<Friend> = (data) => {
        const friend: Friend = {
            ...data
        }
        // @ts-ignore
        setFriends(friends.push(friend));
    }

    return (
        <div className="modal-window-overlay">
            <div className="modal-window-container">
                <div className="modal-window-top">
                    <h1>Заявка на регистрацию для мероприятия</h1>
                    <CloseSign />
                </div>
                <div className="modal-window-middle">
                    <form>
                        <div className="form-field">
                            <label>Тип мероприятия *</label>
                            <input type="text" placeholder="Выберете вид мероприятия"/>
                        </div>
                        <div className="form-field">
                            <label>ФИО *</label>
                            <input type="text" placeholder="Введите ФИО"/>
                        </div>
                        <div className="form-field">
                            <label>Имейл *</label>
                            <input type="email" placeholder="Введите имейл"/>
                        </div>
                        <div className="form-field">
                            <label>Номер телефона *</label>
                            <input type="text" placeholder="+7 777 77 77"/>
                        </div>
                        <button className="add-friend-form-button" onClick={showAddFriendForm}>
                            <AddFriendSign/>
                            <label>Добавить друга</label>
                        </button>
                        <div>
                            Количество друзей: {friends.length}
                        </div>
                        {isShowAddFriendForm && (
                            <form onSubmit={handleSubmit(addFriend)}>
                                <div className="form-field">
                                    <label>ФИО *</label>
                                    <input type="text" placeholder="Введите ФИО"
                                           {...register("FIO", {required: true,})}/>
                                </div>
                                <div className="form-field">
                                    <label>Имейл *</label>
                                    <input type="email" placeholder="Введите имейл" {...register("Email", {required: true,})}/>
                                </div>
                                <div className="form-field">
                                    <label>Номер телефона *</label>
                                    <input type="text" placeholder="+7 777 77 77" {...register("Phone", {required: true,})}/>
                                </div>
                                <button type="submit">Добавить друга</button>
                            </form>
                        )}
                        <div className="form-field">
                            <label>Предпочитаемый вид связи *</label>
                            <select>
                                <option value="phone">Номер телефона</option>
                                <option value="email">Имейл</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-window-bottom">
                    <button className="back-button">Назад</button>
                    <button className="next-button">Дальше</button>
                </div>
            </div>
        </div>
    )
}