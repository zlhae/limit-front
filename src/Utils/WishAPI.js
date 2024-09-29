import axios from 'axios';

export const toggleWish = async (productId, token) => {
    try {
        const response = await axios.put(
            `https://api.lim-it.one/api/v1/products/${productId}/wishes`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'accept': '*/*'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('상품 찜/찜취소 중 오류 발생:', error);
        throw error; 
    }
};
