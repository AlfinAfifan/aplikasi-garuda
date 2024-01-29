const [token, setToken] = useState(null);
const [expire, setExpire] = useState(null);

const navigate = useNavigate();
const refreshToken = async () => {
  try {
    const resp = await axios.get("http://localhost:4000/token", {
      withCredentials: true,
    });
    setToken(resp.data.accessToken);

    const decoded = jwtDecode(resp.data.accessToken);
    setExpire(decoded.exp);
  } catch (error) {
    if (error.response) {
      navigate("/");
    }
  }
};

console.log(expire);

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(
  async (config) => {
    const currenDate = new Date();
    if (expire * 1000 < currenDate.getTime()) {
      const resp = await axios.get("http://localhost:4000/token", {
        withCredentials: true,
      });
      config.headers.Authorization = `Bearer ${resp.data.accessToken}`;
      setToken(resp.data.accessToken);
      const decoded = jwtDecode(resp.data.accessToken);
      setExpire(decoded.exp);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const getData = async () => {
  const resp = await axiosJWT.get("http://localhost:4000/anggota", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setData(resp);
};
