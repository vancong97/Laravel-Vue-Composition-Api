import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { Meta } from "@/types/index";

export default function useClients() {
    const state = reactive({
        client: [] as Array<any>,
        clients: [] as Array<any>,
        errors: '',
        params: {
            from: '',
            to: '',
            total: '',
            currentPage: '',
            perPage: '',
        } as Meta,
    });
    const client = ref<any>([]);
    const clients = ref([]);
 
    const errors = ref<any>('');
    const router = useRouter();

    const meta: Meta = reactive({
        from: '',
        to: '',
        total: '',
        currentPage: '',
        perPage: '',
    });

    // const meta3 = reactive({
    //     meta: {
    //         from: '',
    //         to: '',
    //         total: '',
    //         currentPage: '',
    //         perPage: '',
    //     } as Meta,
        
    // });

    enum UserType {
        Guest = "G",
        Verified = "V",
        Admin = "A",
    }

    const userType: UserType = UserType.Verified;
    console.log(userType);

    const addNumbers = (x: number, y: number): number => {
        // return x + y;
        return x + y;
    };

    console.log(addNumbers(3, 55)) ;

    interface User {
        name: string;
        description: string;
        age: number;
        email: string;
      }

    type UserPreview = Omit<User, "email">;

    const userPreview: UserPreview = {
        name: "Bob",
        description: "Awesome guy",
        age: 20,
    };

    console.log(userPreview);

    const printName = (name: string): void => {
        console.log(name);
    }
      
    const printer = printName('Will');
    console.log(printer);

    const error = (): never => {
        throw new Error("");
    };

    console.log(error);

    const user = {
        personalInfo: {
            name: 'John'
        }
    }

    const name1 = user && user.personalInfo && user.personalInfo.name || undefined;
    const name2 = user?.personalInfo?.name;
    console.log(name1, name2);
    

      
    const links = reactive({
        prev: '',
        next: '',
    });

    const getClients = async (page: number, perPage: number, valueName: string, valueEmail: string) => {
        try {
            let response = await axios.get('/api/clients', {
                params: {
                    page: page,
                    perPage: perPage,
                    name: valueName !== '' ? valueName : null,
                    email: valueEmail !== '' ? valueEmail : null,
                }
            });
            const name: any  = (valueName !== '') ? { name: valueName } : null;
            const email: any = (valueEmail !== '') ? { email: valueEmail } : null;
            const query = {
                ...name,
                ...email,
            };
            await router.push({ name: 'clients.index', query: { page, perPage, ...query } }).catch(()=>{});
            clients.value    = response.data.data;
            links.prev       = response.data.links.prev;
            links.next       = response.data.links.next; 
            meta.currentPage = response.data.meta.current_page;
            meta.perPage     = response.data.meta.per_page;
            meta.from        = response.data.meta.from;
            meta.to          = response.data.meta.to;
            meta.total       = response.data.meta.total;
        } catch (error: any) {
            // throw new Error('This is error')
            console.log(error);
            switch (error.response.status) {
                case 403:
                    await router.push('/403');
                    break;
                case 500:
                    await router.push('/500');
                    break;
                default:
                    console.log(error);
                    break;
            }
        } 
    }

    const showClient = async (id: number) => {
        let response = await axios.get(`/api/clients/${id}`);
        client.value = response.data.data;
    }

    const storeClient = async (data: object) => {
        errors.value = '';
        try {
            await axios.post('/api/clients', data);
            await router.push({ name: 'clients.index' });
        } catch (e: any) {
            console.log(e);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
                // for (const key in e.response.data.errors) {
                //     errors.value += e.response.data.errors[key][0] + ' ';
                // }
            }
        }
 
    }

    const updateClient = async (id: number) => {
        errors.value = '';
        try {
            await axios.patch(`/api/clients/${id}`, client.value);
            await router.push({ name: 'clients.index' });
        } catch (e: any) {
            console.log(e);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
                // for (const key in e.response.data.errors) {
                //     errors.value += e.response.data.errors[key][0] + ' ';
                // }
            }
        }
    }

    const destroyClient = async (id: number) => {
        await axios.delete(`/api/clients/${id}`);
    }

    return {
        errors,
        client,
        clients,
        getClients,
        storeClient,
        showClient,
        updateClient,
        destroyClient,
        meta,
        links
    }
}