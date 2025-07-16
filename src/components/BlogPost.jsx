import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

const BlogPost = ({ post, onBack }) => {
  const fullContent = {
    1: "Building a Movie Recommendation System with Machine Learning\n\nMovie recommendation systems are one of the most popular applications of machine learning in the entertainment industry. In this comprehensive guide, I'll walk you through the process of building a recommendation engine that can suggest movies to users based on their preferences.\n\nUnderstanding Recommendation Systems\n\nThere are two main approaches to building recommendation systems:\n\n1. Collaborative Filtering\nThis approach makes recommendations based on the behavior of similar users. If User A and User B have similar movie preferences, and User A likes a movie that User B hasn't seen, the system will recommend that movie to User B.\n\n2. Content-Based Filtering\nThis method recommends items based on the features of the items themselves. If a user likes action movies with high ratings, the system will recommend other action movies with similar characteristics.\n\nImplementation Details\n\nData Preprocessing\nThe first step in building any machine learning model is data preprocessing. For our movie recommendation system, we need to:\n- Clean the movie dataset\n- Handle missing values\n- Normalize user ratings\n- Create user-item matrices\n\nAlgorithm Selection\nAfter experimenting with various algorithms, I found that a hybrid approach combining both collaborative and content-based filtering yielded the best results.\n\nModel Training and Optimization\nThe model was trained on a dataset of over 100,000 movie ratings. Key optimization techniques included:\n- Matrix factorization for dimensionality reduction\n- Cross-validation for model selection\n- Hyperparameter tuning using grid search\n\nResults and Performance\n\nThe final model achieved:\n- Precision: 0.85\n- Recall: 0.78\n- F1-Score: 0.81\n\nKey Learnings\n\nBuilding this recommendation system taught me valuable lessons about:\n- The importance of data quality in machine learning\n- Balancing between exploration and exploitation in recommendations\n- The cold start problem and potential solutions\n\nFuture Improvements\n\nSome areas for future enhancement include:\n- Incorporating deep learning techniques\n- Adding real-time learning capabilities\n- Implementing explainable AI features\n\nThis project was an excellent introduction to the world of recommendation systems and reinforced my passion for machine learning applications in real-world scenarios.",
    
    2: "Deep Dive into SMS Spam Detection using NLP\n\nSpam detection is a critical application of Natural Language Processing (NLP) that helps protect users from unwanted and potentially harmful messages. In this article, I'll share my experience building an SMS spam detection system with high accuracy.\n\nThe Challenge\n\nSMS spam detection presents unique challenges:\n- Limited text length\n- Informal language and abbreviations\n- Evolving spam tactics\n- Need for real-time processing\n\nDataset and Preprocessing\n\nData Collection\nI used a publicly available SMS spam dataset containing over 5,000 messages labeled as either 'spam' or 'ham' (legitimate messages).\n\nText Preprocessing Pipeline\nThe preprocessing pipeline included:\n\n1. Text Cleaning\n   - Removing special characters\n   - Converting to lowercase\n   - Handling contractions\n\n2. Tokenization\n   - Splitting text into individual words\n   - Removing stop words\n   - Stemming and lemmatization\n\n3. Feature Engineering\n   - TF-IDF vectorization\n   - N-gram analysis\n   - Message length features\n\nModel Development\n\nAlgorithm Comparison\nI tested several machine learning algorithms:\n- Naive Bayes: Baseline model with good performance\n- Support Vector Machine: Best overall performance\n- Random Forest: Good interpretability\n- Logistic Regression: Fast and efficient\n\nFeature Selection\nKey features that proved most effective:\n- Presence of certain keywords\n- Message length\n- Number of capital letters\n- Frequency of special characters\n\nImplementation with Streamlit\n\nTo make the model accessible, I created a web interface using Streamlit that allows users to input messages and get real-time spam predictions.\n\nResults and Evaluation\n\nThe final model achieved impressive results:\n- Accuracy: 97.8%\n- Precision: 96.5%\n- Recall: 94.2%\n- F1-Score: 95.3%\n\nConfusion Matrix Analysis\nThe model showed excellent performance with minimal false positives, which is crucial for spam detection to avoid blocking legitimate messages.\n\nDeployment Considerations\n\nWhen deploying spam detection systems, consider:\n- Latency: Real-time processing requirements\n- Scalability: Handling high message volumes\n- Privacy: Protecting user data\n- Adaptability: Updating models as spam evolves\n\nLessons Learned\n\nThis project reinforced several important concepts:\n- The power of proper text preprocessing\n- Importance of feature engineering in NLP\n- Value of model interpretability in production systems\n- Need for continuous model monitoring and updates\n\nFuture Enhancements\n\nPotential improvements include:\n- Deep learning approaches (LSTM, BERT)\n- Multi-language support\n- Real-time learning from user feedback\n- Integration with messaging platforms\n\nBuilding this SMS spam detection system was an excellent way to apply NLP techniques to a practical problem that affects millions of users daily.",
    
    3: "Car Price Prediction: From Data to Deployment\n\nPredicting car prices accurately is a valuable application of machine learning that can help both buyers and sellers make informed decisions. In this comprehensive guide, I'll walk you through my journey of building and deploying a car price prediction model.\n\nProject Overview\n\nThe goal was to create a machine learning model that could predict car prices based on various features such as:\n- Brand and model\n- Year of manufacture\n- Engine size and type\n- Mileage\n- Fuel type\n- Transmission type\n- Previous owners\n\nData Collection and Exploration\n\nDataset Characteristics\n- Size: 10,000+ car listings\n- Features: 15 different attributes\n- Target: Car price in USD\n- Source: Multiple online car marketplaces\n\nExploratory Data Analysis\nKey insights from the data exploration:\n1. Price Distribution: Right-skewed with most cars under $30,000\n2. Brand Impact: Luxury brands command premium prices\n3. Age Factor: Exponential depreciation with age\n4. Mileage Effect: Strong negative correlation with price\n\nData Preprocessing\n\nHandling Missing Values\n- Numerical features: Median imputation\n- Categorical features: Mode imputation\n- Engine size: Domain knowledge-based imputation\n\nFeature Engineering\nCreated several new features:\n- Car age (current year - manufacture year)\n- Price per mile ratio\n- Brand category (luxury, economy, mid-range)\n- Engine efficiency score\n\nCategorical Encoding\n- One-hot encoding for nominal variables\n- Label encoding for ordinal variables\n- Target encoding for high-cardinality features\n\nModel Development\n\nAlgorithm Selection\nI experimented with multiple regression algorithms:\n\n1. Linear Regression\n   - Pros: Interpretable, fast training\n   - Cons: Assumes linear relationships\n   - Performance: R² = 0.72\n\n2. Random Forest\n   - Pros: Handles non-linearity, feature importance\n   - Cons: Can overfit, less interpretable\n   - Performance: R² = 0.89\n\n3. Gradient Boosting\n   - Pros: High accuracy, robust to outliers\n   - Cons: Longer training time, hyperparameter sensitive\n   - Performance: R² = 0.92\n\nHyperparameter Optimization\nUsed GridSearchCV for optimal parameters with the Gradient Boosting model.\n\nModel Evaluation\n\nPerformance Metrics\nFinal model performance:\n- R² Score: 0.924\n- Mean Absolute Error: $2,150\n- Root Mean Square Error: $3,200\n- Mean Absolute Percentage Error: 8.5%\n\nFeature Importance Analysis\nTop factors affecting car prices:\n1. Car age (35% importance)\n2. Brand (22% importance)\n3. Engine size (18% importance)\n4. Mileage (15% importance)\n5. Fuel type (10% importance)\n\nVisualization and Insights\n\nCreated comprehensive visualizations using Matplotlib and Seaborn to analyze price vs age relationships, residual analysis, and feature correlations.\n\nModel Deployment\n\nThe model was saved using pickle and a prediction function was created for easy integration into applications.\n\nReal-World Applications\n\nThis model can be used for:\n- Car dealerships: Pricing inventory\n- Insurance companies: Determining vehicle values\n- Individual sellers: Setting competitive prices\n- Buyers: Identifying fair deals\n\nChallenges and Solutions\n\nChallenge 1: Outliers\nProblem: Luxury cars skewing the model\nSolution: Separate models for different price ranges\n\nChallenge 2: New Models\nProblem: Predicting prices for recently launched models\nSolution: Feature engineering based on similar models\n\nChallenge 3: Market Fluctuations\nProblem: Economic factors affecting prices\nSolution: Regular model retraining with recent data\n\nLessons Learned\n\nKey takeaways from this project:\n1. Domain knowledge is crucial for feature engineering\n2. Data quality matters more than model complexity\n3. Regular updates are essential for production models\n4. Interpretability is important for stakeholder buy-in\n\nFuture Improvements\n\nPotential enhancements:\n- Deep learning: Neural networks for complex patterns\n- Time series: Incorporating market trends\n- Image analysis: Using car photos for condition assessment\n- Real-time data: Live market price feeds\n\nConclusion\n\nBuilding this car price prediction model was an excellent exercise in applying machine learning to a real-world problem. The project demonstrated the importance of thorough data preprocessing, careful feature engineering, and comprehensive model evaluation.\n\nThe final model achieved high accuracy and provides valuable insights into the factors that drive car prices, making it a useful tool for various stakeholders in the automotive market."
  }

  const currentPost = fullContent[post.id] || "Content not available."

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-background text-foreground">
      <Button 
        onClick={onBack}
        variant="outline" 
        className="mb-6 flex items-center hover-glow border-border text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Button>
      
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
          
          <div className="flex items-center space-x-6 text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-accent/20 text-accent">
                {tag}
              </Badge>
            ))}
          </div>
        </header>
        
        <div className="prose prose-slate max-w-none">
          <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-lg">
            {currentPost}
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogPost

