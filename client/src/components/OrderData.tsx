import { Order, Topping, Note } from "./../tools/orders.model";

export default function OrderData({ order }:{order:Order}) {

    return (
        <div className="py-4">
            <div className="font-bold text-red-700 text-2xl pb-2 ">Order #{order.id}:</div>
            <div className="font-bold text-lg"><i className="fas fa-info-circle"></i> Customer Information</div>
            <div className="pb-2"><div>{order.name}</div><div>{order.address}</div><div>{order.city}</div></div>
            <div className="font-bold text-lg"><i className="fas fa-pizza-slice"></i> Pizza Size</div>
            <div className="pb-2">{order.size}</div>
            <div className="font-bold text-lg"><i className="fas fa-list-ul"></i> Order Details</div>
            <div className="pb-2">

                {order.toppings.map((topping: Topping) =>
                    <div>{topping.topping}</div>
                )}

            </div>
            <div className="font-bold text-lg"><i className="fas fa-sticky-note"></i> Order Notes</div>
            <div className="pb-2">
                {order.notes.map((note: Note) =>
                    <div>{note.note}</div>
                )}

            </div>
        </div>
    );
}