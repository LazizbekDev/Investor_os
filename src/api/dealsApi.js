import api from "@/lib/apiClient";

export const getDeals = async () => {
    const res = await api.get("/deals");
    return res.data;
};

export const createDeal = async (deal) => {
    const res = await api.post("/deals", deal);
    return res.data;
};

export const deleteDeal = async (id) => {
    const res = await api.delete(`/deals/${id}`);
    return res.data;
};

export const addNote = async (note) => {
    const res = await api.post("/notes", note);
    return res.data;
};

export const getNotes = async (dealId) => {
    const res = await api.get(`/notes/deal/${dealId}`);
    return res.data;
};

export const transitionDeal = async (id, to) => {
    try {
        const res = await api.post(`/deals/${id}/transition`, { to });
        return res.data;
    } catch (err) {
        if (err.response) {
            // Backend xatosi
            console.error("Backend error:", err.response.status, err.response.data);
        } else if (err.request) {
            // Request serverga chiqmagan (frontend taraf xatosi: CORS, network)
            console.error("Frontend/Network error:", err.request);
        } else {
            // Boshqa koddagi xato
            console.error("Code error:", err.message);
        }
    }
};