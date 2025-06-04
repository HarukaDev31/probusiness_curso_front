
class MainService {
    async getPaises() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getPaises`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    }
    async getDepartamentos(paisId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getDepartamentos`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching departments:', error);
            throw error;
        }
    }
    async getProvincias(departamentoId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getProvincias`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ departamentoId })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching provinces:', error);
            throw error;
        }
    }
    async getDistritos(provinciaId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getDistritos`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ provinciaId })
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching districts:', error);
            throw error;
        }
    }
    async crearUsuario(usuario) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/crearUsuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}
export default new MainService();