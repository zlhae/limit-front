import axios from 'axios';

// Access Token 갱신
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post('https://api.lim-it.one/api/v1/auth/token', {}, {
      headers: {
        'Cookie': `RefreshToken=${localStorage.getItem('refreshToken')}` // 쿠키 또는 로컬 스토리지에서 RefreshToken 가져오기
      },
      withCredentials: true  // 쿠키 전송 설정
    });
    
    const newAccessToken = response.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);  // 새로운 AccessToken 저장
    return newAccessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error.message);
    return null;
  }
};

// API 요청 함수
export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem('accessToken');
  
  if (!token) {
    token = await refreshAccessToken();
  }

  try {
    const response = await axios.get(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response;
  } catch (error) {
    // 토큰 만료 시 재발급 및 재요청 처리
    if (error.response && error.response.status === 401) {
      token = await refreshAccessToken();
      if (token) {
        return axios.get(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    }
    throw error;
  }
};
