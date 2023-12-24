const Le_ip = " 192.168.98.175";
const Nguyen_ip = "3.27.162.172";
const Nguyen_dan = "172.20.10.2";
const Local_host = "localhost";
const Local_Truongt1= "10.10.59.86";
const Local_Cafe = "192.168.1.207"
const Truong_host = "10.10.58.58";

export const baseUrl = `https://${Nguyen_ip}`;

export const postRequest = async(url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json();

    if (!response.ok) {
        let message;
        if (data?.message) {
            message = data.message
        } else {
            message = data;
        }

        return {error: true, message};
    }

    return data;
}

export const getRequest = async(url, token) => {

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": 'Bearer ' + token
        }
    });
    const data = await response.json();
    
    if (!response.ok) {
        let message = "An error occured...";

        if(data?.message) {
            message = data.message;
        }

        return {error:true, message}
    }

    return data;
}

export const postRequestWithToken = async(url, token, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body
    })

    const data = await response.json();

    if (!response.ok) {
        let message;
        if (data?.message) {
            message = data.message
        } else {
            message = data;
        }

        return {error: true, message};
    }

    return data;
}

