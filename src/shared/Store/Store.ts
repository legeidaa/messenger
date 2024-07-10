export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        // метод EventBus
        this.emit(StoreEvents.Updated);
    };

}

class UserController {
    public getUser() {
        UserAPI.getUser()
            .then(data => store.set('user', data);
    }
}


class UserProfile extends Block {
    constructor(...args) {
        super(...args);

        // запрашиваем данные у контроллера
        UserController.getUser();

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
            // вызываем обновление компонента, передав данные из хранилища
            this.setProps(store.getState());
        });
    }

    render() {
        // внутри рендер в this.props будут достпны данные из хранилища
    }
}




function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Block) {
        return class extends Component {
            constructor(props) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        }
    }
}


function mapUserToProps(state) {
    return {
        name: state.user.name,
        avatar: state.user.avatar,
    };
}

connect(UserProfile, mapUserToProps); 
