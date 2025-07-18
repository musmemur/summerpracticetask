import './index.css';
import {CloseSign} from "../shared/CloseSign";
import {AddFriendSign} from "../shared/AddFriendSign";
import React, {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {Friend} from "../entities/Friend.ts";
import type {Event} from "../entities/Event.ts";

export const ModalWindow = () => {
    const [isShowAddFriendForm, setIsShowAddFriendForm] = useState<boolean>(false);
    const [friends, setFriends] = useState<Friend[]>([]);

    const {
        handleSubmit: handleEventSubmit,
        register: registerEvent
    } = useForm<Event>();

    const {
        handleSubmit: handleFriendSubmit,
        register: registerFriend,
    } = useForm<Friend>();

    const showAddFriendForm = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsShowAddFriendForm(!isShowAddFriendForm);
    }

    const addFriend: SubmitHandler<Friend> = (data) => {
        const friend: Friend = {
            ...data
        }
        setFriends(prevFriends => [...prevFriends, friend]);
        setIsShowAddFriendForm(!isShowAddFriendForm);
    }

    const addEvent: SubmitHandler<Event> = (data) => {
        const event: Event = {
            ...data,
            friends,
            connectionType: data.connectionType
        }
        console.log(event);
    }

    return (
        <div className="modal-window-container">
            <div className="modal-window-top">
                <h1>Заявка на регистрацию для мероприятия</h1>
                <button>
                    <CloseSign />
                </button>
            </div>
            <div className="modal-window-middle">
                <form onSubmit={handleEventSubmit(addEvent)}>
                    <div className="form-field">
                        <label>Тип мероприятия *</label>
                        <input type="text" placeholder="Выберете вид мероприятия"
                               {...registerEvent("eventType", {required: true,})}/>
                    </div>
                    <div className="form-field">
                        <label>ФИО *</label>
                        <input type="text" placeholder="Введите ФИО"
                               {...registerEvent("FIOEventOwner", {required: true,})}/>
                    </div>
                    <div className="form-field">
                        <label>Имейл *</label>
                        <input type="email" placeholder="Введите имейл"
                               {...registerEvent("emailEventOwner", {required: true,})}/>
                    </div>
                    <div className="form-field">
                        <label>Номер телефона *</label>
                        <input type="text" placeholder="+7 777 77 77"
                               {...registerEvent("phoneEventOwner", {required: true,})}/>
                    </div>
                    {friends.length < 3 && (
                        <button className="add-friend-form-button" onClick={showAddFriendForm}>
                            <AddFriendSign/>
                            <label>Добавить друга</label>
                        </button>
                    )}
                    <div>
                        Количество друзей: {friends.length}
                    </div>
                    {isShowAddFriendForm && (
                        <div className="add-friend-form">
                            <div className="form-field">
                                <label>ФИО *</label>
                                <input type="text" placeholder="Введите ФИО"
                                       {...registerFriend("FIO", {required: true,})}/>
                            </div>
                            <div className="form-field">
                                <label>Имейл *</label>
                                <input type="email" placeholder="Введите имейл"
                                       {...registerFriend("Email", {required: true,})}/>
                            </div>
                            <div className="form-field">
                                <label>Номер телефона *</label>
                                <input type="text" placeholder="+7 777 77 77"
                                       {...registerFriend("Phone", {required: true,})}/>
                            </div>
                            <button type="button" onClick={handleFriendSubmit(addFriend)}>
                                Добавить друга
                            </button>
                        </div>
                    )}
                    <div className="form-field">
                        <label>Предпочитаемый вид связи *</label>
                        <select {...registerEvent("connectionType", {required: true,})}>
                            <option value="" disabled selected hidden>Выберите вид связи</option>
                            <option value="phone">Номер телефона</option>
                            <option value="email">Имейл</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="modal-window-bottom">
                <button className="back-button">Назад</button>
                <button className="next-button" onClick={handleEventSubmit(addEvent)}>Дальше</button>
            </div>
        </div>
    )
}