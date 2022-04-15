const {
    Schema, model
    } = require('mongoose');
    
    const BankSchema = new Schema(
        {
        name: String,
        account: String,
        bank_name: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
      }
    )
    
    const Bank = model('bank', BankSchema);
    
    module.exports  = Bank;