function order(){

    const orderItem = {
        name: "red",
        quantity: 1,
    }
    // document.querySelector('.order-button').addEventListener('click', () => {
        fetch("/api/order", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(orderItem)
        }).then((response) => {
            if(!response.ok){
                throw new Error("order failed");
            }
            return response.json();
        }).then((data) => {
            alert(`Order successful! Data: ${JSON.stringify(data)}`);
        }).catch((error) => {
            console.error("Error", error.message)
            alert("An error occurred while placing the order.\n주문을 처리하는 동안 오류가 발생했습니다.");
        })
    // })

}

