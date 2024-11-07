<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <h4>Personal Information</h4>
                <h6>
  Status: <span :class="formData.status === 'online' ? 'text-green-7' : 'text-red-7'">{{ formData.status }}</span>
</h6>
                <q-separator/>
                <div class="row q-mt-lg">
                    <q-input class="col col-md-5 q-mx-sm" filled v-model="formData.username" label="Username" readonly />
                </div>
                <div class="row q-mt-lg">
                    <q-input class="col col-md-5 q-mx-sm" filled v-model="authInputs.password" type="password" label="Password" :readonly="isEdit == 1 ? false: true"/>
                    <q-input class="col col-md-5 q-mx-sm" filled v-model="authInputs.confirm_password" type="password" label="Confirm Password"  :readonly="isEdit == 1 ? false: true"/>
                </div>
                <div class="row q-mt-lg">
                    <q-input class="col col-md-5 q-mx-sm" filled v-model="formData.first_name" label="Firstname" :readonly="isEdit == 1 ? false: true"/>
                    <q-input class="col col-md-5 q-mx-sm" filled v-model="formData.last_name" label="Lastname"  :readonly="isEdit == 1 ? false: true"/>
                </div>
                <div class="row q-mt-lg">
                    <q-select class="col col-md-5 q-mx-sm" filled v-model="formData.gender" :options="option" label="Gender" :readonly="isEdit == 1 ? false: true"/>
                </div>
                <div class="flex justify-start q-mt-lg">
                    <span v-if="isEdit === 1">
                        <q-btn flat icon="mdi-check" @click="handleUpdateInfo">
                            <q-tooltip>Submit Changes</q-tooltip>
                        </q-btn>
                    </span>
                    <span v-else>
                        <q-btn flat icon="mdi-account-edit-outline" @click="isEdit = 1">
                        <q-tooltip>Edit Information</q-tooltip>
                    </q-btn>
                    </span>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import { getMyProfile, UpdateProfile } from 'src/services/api.services';
import {onMounted,ref} from 'vue'
import {usersT} from 'src/components/models'
import {useQuasar} from 'quasar'
  
  const $q = useQuasar();
const isEdit = ref(0)

const formData = ref<usersT>({
        id: 0,
        username: '',
        status: '',
        first_name: '',
        last_name: '',
        gender: ''
})
const authInputs = ref({
    password:'',
    confirm_password:""
})
const option = ['male','female']
const handleGetData =async () => {
    await getMyProfile().then(response =>{
        const {userData} = response.data
        formData.value.id = userData.id
        formData.value.username = userData.username
        formData.value.status = userData.status
        formData.value.first_name = userData.first_name
        formData.value.last_name = userData.last_name
        formData.value.gender = userData.gender
    }).catch(error => {
        console.log(error)
    })
}

const handleUpdateInfo = async()=>{

    await UpdateProfile({password:authInputs.value.password,
        confirm_password:authInputs.value.password,
        first_name:formData.value.first_name,
        last_name:formData.value.last_name,
        gender:formData.value.gender
    }).then(response =>{
        isEdit.value = 0
        authInputs.value.password = ""
        authInputs.value.confirm_password = ""
        $q.notify({
          color: 'positive',
          textColor: 'white',
          position: 'top',
          icon: 'check',
          message: response.data.message,
        });
    }).catch(error =>{
        $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'close',
          message: error.response.data.message,
        });
    })
}

onMounted(()=>{
    handleGetData()
})
</script>

<style scoped>

</style>