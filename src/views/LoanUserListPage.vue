<template>
    <div class="layout">
        <div class="loanList-contents">
            <h1 class="title-text">Loan Borrower User List</h1>
            <p class="secondarytitle-text">List of all users who are borrowing loan in the given data</p>
            <div class="options-container">
                <input type="text" class="form-control custom-input-form" id="searchquery" placeholder="Filter data berdasarkan input" v-model="searchquery" />
                <button type="submit" class="filter-btn" @click="filterQuery">Filter</button>
                <div style="flex: 1; margin-left: 63%;">
                    <button type="submit" class="sortPurpose-btn" @click="sortByLoanPurpose">Sort by Purpose</button>
                </div>
            </div>
            <div class="table-container">
                <table class="table-styles">
                    <thead class="table-header">
                        <tr>
                            <th class="tablehead-text">#</th>
                            <th class="tablehead-text">Loan ID</th>
                            <th class="tablehead-text">Borrower ID</th>
                            <th class="tablehead-text">Borrower Name</th>
                            <th class="tablehead-text">Loan Purpose</th>
                            <th class="tablehead-text">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(loanuser, index) in paginatedData" :key="loanuser.id" :class="{'odd-row': index%2 === 0, 'even-row': index%2 !== 0}" class="table-body-border">
                            <td>{{ index + 1 }}</td>
                            <td>{{ loanuser.id }}</td>
                            <td>{{ loanuser.borrower.id }}</td>
                            <td>{{ loanuser.borrower.name }}</td>
                            <td>{{ loanuser.purpose }}</td>
                            <td>
                                <button type="submit" class="details-btn" @click="goToBorrowerDetails(loanuser)">Check Details</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination-container">
                <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            borrowerData: [],
            filteredBorrowerData: [],
            searchquery: null,
            currentPage: 1,
            itemsPerPage: 6,
        }
    },
    created(){
        this.loadData()
    },
    computed:{
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredBorrowerData.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredBorrowerData.length / this.itemsPerPage);
        }
    },
    methods: {
        goToBorrowerDetails(id){
            this.$router.push({name: 'LoanDetails', params: {id}});
            localStorage.selectedLoanID = id.id
            localStorage.selectedBorrowerID = id.borrower.id
            localStorage.selectedBorrowerName = id.borrower.name
            localStorage.selectedBorrowerEmail = id.borrower.email
            localStorage.selectedBorrowerCreditScore = id.borrower.creditScore
            localStorage.selectedBorrowerDueDate1 = id.repaymentSchedule.installments[0].dueDate
            localStorage.selectedBorrowerAmountDue1 = id.repaymentSchedule.installments[0].amountDue
            localStorage.selectedBorrowerDueDate2 = id.repaymentSchedule.installments[1].dueDate
            localStorage.selectedBorrowerAmountDue2 = id.repaymentSchedule.installments[1].amountDue
            console.log('ID clicked: ', id);
        },
        loadData(){
            setTimeout(() => {
                const axios = require('axios');

                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://raw.githubusercontent.com/andreascandle/p2p_json_test/main/api/json/loans.json',
                    headers: { }
                };

                axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.borrowerData = response.data;
                    this.filteredBorrowerData = response.data;
                    console.log('Fetched Loans:', this.borrowerData);
                })
                .catch((error) => {
                    console.log(error);
                });
            }, 500)
        },
        filterQuery(){
            if (!this.searchquery) {
                // If no search query, show all data
                this.filteredBorrowerData = this.borrowerData;
            } else {
                // Filter the data based on the search query
                this.filteredBorrowerData = this.borrowerData.filter(loanuser => {
                    return (
                        loanuser.id.toString().includes(this.searchquery) ||
                        loanuser.borrower.id.toString().includes(this.searchquery) ||
                        loanuser.borrower.name.toString().includes(this.searchquery) ||
                        loanuser.purpose.toLowerCase().includes(this.searchquery.toLowerCase())
                    );
                });
            }
            this.currentPage = 1;
        },
        sortByLoanPurpose(){
            console.log('Before Sorting:', this.filteredBorrowerData);

            const priorityOrder = ["Business Expansion", "Education", "Home Improvement", "Others"];

            const sortedData = [...this.filteredBorrowerData].sort((a, b) => {
            const purposeA = String(a.purpose).trim();
            const purposeB = String(b.purpose).trim();

            const indexA = priorityOrder.indexOf(purposeA);
            const indexB = priorityOrder.indexOf(purposeB);

            if (indexA === indexB) {
                return a.amount - b.amount; // If terms are the same, sort by amount
            } else {
                return indexA - indexB;
            }
            });

            this.filteredBorrowerData = sortedData; // Trigger Vue reactivity
            this.currentPage = 1;
            console.log('After Sorting:', this.filteredBorrowerData);
        },
    },
}
</script>

<style scoped>
/*Layout and Page Header CSS*/
.layout{
    display: flex;
}

.title-text{
    font-weight: bold;
    font-size: 24px;
    margin-top: 7px;
    margin-left: 3%;
}
.secondarytitle-text{
    font-size: 14px;
    margin-top: -8px;
    margin-left: 3%;
}

.loanList-contents{
    flex: 1;
    padding-left: 16px;
}

/*Sort and Filter Util CSS*/
.options-container{
    display: flex;
    margin-left: 3%;
    margin-top: -8px;
}
.filter-btn{
    margin-left: 5px;
    width: 70px;
    height: 35px;
    font-size: 11px;
    border: none;
    border-radius: 5px;
    padding: 0.3vw;
    background-color: #87CEEB;
    color: #013042;
    transition: background-color 0.3s ease;
    font-weight: bolder;
}
.filter-btn:hover{
    filter: brightness(90%);
}
.custom-input-form{
    background-color: #ffffff;
    height: 35px;
    width: 300px;
    text-decoration: none solid rgba(0, 0, 0, 0.87);
    border-color: rgba(1, 48, 66, 0.2) !important;
    word-spacing: 0px;
    letter-spacing: 0.131118px;
    font-size: 12px !important;
    box-sizing: border-box;
    outline: rgba(0, 0, 0, 0.87) none 0px;
}
.custom-input-form:focus{
    outline: none !important;
    box-shadow: none !important;
    border-color: rgba(1, 48, 66, 0.8) !important;
    border-width: 2.5px;
    background-color: #ffffff;
    color: #000000;
    font-size: 12px;
}
::placeholder{
    font-size: 12px;
}
.sortPurpose-btn{
    margin-left: 5px;
    width: 110px;
    height: 35px;
    font-size: 11px;
    border: none;
    border-radius: 5px;
    padding: 0.3vw;
    background-color: #A7C7E7;
    color: #013042;
    transition: background-color 0.3s ease;
    font-weight: bolder;
}
.sortPurpose-btn:hover{
    filter: brightness(90%);
}

/*Table CSS*/
.table-container{
    margin-top: 10px;
    max-width: 97%;
    max-height: 500px;
    overflow-y: auto;
    padding-left: 3%;
}
.table-container::-webkit-scrollbar{
    width: 8px;
}
.table-container::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
}
.table-container::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 4px;
}
.table-styles{
    width: 100%;
}
thead tr{
    height: 60px;
}
th, td{
    text-align: center;
    padding: 16px;
}
.table-header{
    background-color: #cccccc;
    text-align: center;
    border-bottom: 1px solid #989898;
}
.tablehead-text{
    font-size: 14px;
    text-align: center;
    font-weight: bold;
}
.odd-row{
        background-color: #ffffff;
}
.even-row{
    background-color: #e6e6e6;
}
.table-body-border{
    border-bottom: 1px solid #989898;
}
.details-btn{
    margin-left: 10px;
    width: 100px;
    height: 35px;
    font-size: 10px;
    font-weight: bolder;
    border: none;
    border-radius: 5px;
    padding: 0.3vw;
    background-color: #6082B6;
    color: #F0FFFF;
    transition: background-color 0.3s ease;
}
.details-btn:hover{
    filter: brightness(90%);
}

/*Pagination CSS */
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
.pagination-container button {
    width: 70px;
    height: 35px;
    font-size: 11px;
    border: none;
    border-radius: 5px;
    padding: 10px;
    background-color: #ADD8E6;
    color: #013042;
    transition: background-color 0.3s ease;
    font-weight: bolder;
}

.pagination-container button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.pagination-container button:hover {
    filter: brightness(90%);
}

.pagination-container span {
    font-size: 14px;
    margin: 0 10px;
}
</style>