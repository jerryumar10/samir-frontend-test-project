<template>
    <div class="layout">
        <div class="loanList-contents">
            <h1 class="title-text">Loan Details: {{ borrowerName }}</h1>
            <p class="secondarytitle-text">List of all repayments due for: {{ borrowerName }}</p>
            <div class="table-container">
                <table class="table-styles">
                    <thead class="table-header">
                        <tr>
                            <th class="tablehead-text">#</th>
                            <th class="tablehead-text">Borrower ID</th>
                            <th class="tablehead-text">Borrower Name</th>
                            <th class="tablehead-text">Email</th>
                            <th class="tablehead-text">Credit Score</th>
                            <th class="tablehead-text">Repayment Due Date</th>
                            <th class="tablehead-text">Repayment Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="{'odd-row': index%2 === 0, 'even-row': index%2 !== 0}" class="table-body-border">
                            <td>1</td>
                            <td>{{ borrowerID }}</td>
                            <td>{{ borrowerName }}</td>
                            <td>{{ borrowerEmail }}</td>
                            <td>{{ borrowerCreditScore }}</td>
                            <td>{{ borrowerPaymentDueDate1 }}</td>
                            <td>{{ borrowerPaymentDueAmount1 }}</td>
                        </tr>
                        <tr :class="{'odd-row': index%2 === 0, 'even-row': index%2 !== 0}" class="table-body-border">
                            <td>2</td>
                            <td>{{ borrowerID }}</td>
                            <td>{{ borrowerName }}</td>
                            <td>{{ borrowerEmail }}</td>
                            <td>{{ borrowerCreditScore }}</td>
                            <td>{{ borrowerPaymentDueDate2 }}</td>
                            <td>{{ borrowerPaymentDueAmount2 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data(){
        return{
            loanID: localStorage.selectedLoanID,
            borrowerID: localStorage.selectedBorrowerID,
            borrowerName: localStorage.selectedBorrowerName,
            borrowerEmail: localStorage.selectedBorrowerEmail,
            borrowerCreditScore: localStorage.selectedBorrowerCreditScore,
            borrowerPaymentDueDate1: localStorage.selectedBorrowerDueDate1,
            borrowerPaymentDueAmount1: localStorage.selectedBorrowerAmountDue1,
            borrowerPaymentDueDate2: localStorage.selectedBorrowerDueDate2,
            borrowerPaymentDueAmount2: localStorage.selectedBorrowerAmountDue2
        }
    },
}
</script>

<style scoped>
.layout{
    display: flex;
}

.title-text{
    font-weight: bold;
    font-size: 24px;
    margin-top: 10px;
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
.table-container{
    margin-top: 15px;
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
    height: 50px;
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
    width: 110px;
    height: 35px;
    font-size: 10px;
    font-weight: bolder;
    border: none;
    border-radius: 5px;
    padding: 0.3vw;
    background-color: #ffd600;
    color: #013042;
    transition: background-color 0.3s ease;
}
.details-btn:hover{
    filter: brightness(90%);
}
</style>