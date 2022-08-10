


// Using Define model method
module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("posts", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            required: true,
        },
        title: {
            type: DataTypes.STRING,
            required: true,
        },
        summary: {
            type: DataTypes.STRING,
            required: true,
            
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model:"user",
                key:"id",
            }
        }
       
        
    },
    {
        timestamps: true,
    },
    {

    }
    )
     return Post;
}