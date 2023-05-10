type Events = {
    add:  string;
    delete: string;
}

type OnEvents = {
    [Property in keyof Events as `on${Capitalize<Property>}`] : () => any;
}

const userActions: OnEvents = {
    onAdd: () => {},
    onDelete: () => {}
}
