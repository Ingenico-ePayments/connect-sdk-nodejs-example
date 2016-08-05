var express = require('express');
var app = express();
var marko = require('marko');
require('marko/node-require').install();
var connectSdk = require('connect-sdk-nodejs');

var logger = require('./util/logger');

// stubs
var createHostedCheckoutStub = require('./stubs/hostedcheckouts/createHostedCheckout.json');
var createPaymentStub = require('./stubs/payments/createPaymentRequest.json');
var approvePaymentRequestStub = require('./stubs/payments/approvePaymentRequest.json');
var tokenizePaymentStub = require('./stubs/payments/tokenizePaymentRequest.json');
var createRefundStub = require('./stubs/payments/createRefundRequest.json');
var createPayoutStub = require('./stubs/payouts/createPayoutRequest.json');
var approvePayoutStub = require('./stubs/payouts/approvePayoutRequest.json');
var approveRefundStub = require('./stubs/refunds/approveRefundRequest.json');
var riskAssessmentCardStub = require('./stubs/riskassessments/riskAssessmentCardRequest.json');
var riskAssessmentBankAccountStub = require('./stubs/riskassessments/riskAssessmentBankAccountRequest.json');
var retrieveIINdetailsStub = require('./stubs/services/retrieveIINDetailsRequest.json');
var convertBankAccountStub = require('./stubs/services/convertBankAccountRequest.json');
var createSessionStub = require('./stubs/sessions/createSessionRequest.json');
var createTokenStub = require('./stubs/tokens/createTokenRequest.json');
var updateTokenStub = require('./stubs/tokens/updateTokenRequest.json');
var approvesepadirectdebitStub = require('./stubs/tokens/approvesepadirectdebitRequest.json');

var config = require('./config.json');

connectSdk.init({
  host: config.apiEndpoint.host,
  scheme: config.apiEndpoint.scheme,
  port: config.apiEndpoint.port,
  enableLogging: config.enableLogging, // defaults to false
  logger: logger, // if undefined console.log will be used
  apiKeyId: config.apiKeyId,
  secretApiKey: config.secretApiKey
});

// DEMO app
var port = config.port;
var merchantId = config.merchantId;

app.engine('marko', function (filePath, options, callback) {
  marko.load(filePath).render(options, function (err, output) {
    callback(null, output);
  });
});
app.use('/global', express.static(__dirname + '/global'));
app.set('view engine', 'marko');

app.get('/', function (req, res) {
  res.render('index');
});
var render = function (res, error, response) {
  if (error) {
    console.log(error, error.body);
    var status = (typeof error.status !== 'undefined') ? error.status : 500;
    var body = (typeof error.body !== 'undefined') ? error.body : error;
    res.status(status).json(body).end();
  } else {
    res.status(response.status).json(response.body).end();
  }
  if (connectSdk.context.getIdempotenceRequestTimestamp()) {
    // this call is made with idempotence annd is still being handled
    console.log('idempotence timestamp', connectSdk.context.getIdempotenceRequestTimestamp());
  }
};

// hardcoded for demo purposes
var paymentContext = {
  currencyCode: "EUR",
  countryCode: "NL",
  locale: "en_GB",
  amount: 1000,
  isRecurring: true
};

// all SDK methods; grouped by API method

// hosted checkouts
app.get('/hostedcheckout', function (req, res) {
  connectSdk.hostedcheckouts.create(merchantId, createHostedCheckoutStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/hostedcheckoutstatus/:hostedCheckoutId', function (req, res) {
  connectSdk.hostedcheckouts.get(merchantId, req.params.hostedCheckoutId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// payments
app.get('/payments/createPayment', function (req, res) {
  paymentContext.idemPotence = {
    key: 'idempotence'
  };
  connectSdk.payments.create(merchantId, createPaymentStub, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/retrievePayment/:paymentId', function (req, res) {
  connectSdk.payments.get(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/approvesChallengedPayment/:paymentId', function (req, res) {
  connectSdk.payments.processchallenged(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/capturePayment/:paymentId', function (req, res) {
  connectSdk.payments.approve(merchantId, req.params.paymentId, approvePaymentRequestStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/tokenizePayment/:paymentId', function (req, res) {
  connectSdk.payments.tokenize(merchantId, req.params.paymentId, tokenizePaymentStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/cancelPayment/:paymentId', function (req, res) {
  connectSdk.payments.cancel(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/createRefund/:paymentId', function (req, res) {
  connectSdk.payments.refund(merchantId, req.params.paymentId, createRefundStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/cancelApprovalPayment/:paymentId', function (req, res) {
  connectSdk.payments.cancelapproval(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// payouts
app.get('/payouts/createPayout', function (req, res) {
  connectSdk.payouts.create(merchantId, createPayoutStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payouts/retrievePayout/:payoutId', function (req, res) {
  connectSdk.payouts.get(merchantId, req.params.payoutId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payouts/approvesPayout/:payoutId', function (req, res) {
  connectSdk.payouts.approve(merchantId, req.params.payoutId, approvePayoutStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payouts/cancelApprovalPayout/:payoutId', function (req, res) {
  connectSdk.payouts.cancelapproval(merchantId, req.params.payoutId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payouts/cancelPayout/:payoutId', function (req, res) {
  connectSdk.payouts.cancel(merchantId, req.params.payoutId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// products
app.get('/products/retrievePaymentProducts', function (req, res) {
  connectSdk.products.find(merchantId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/products/retrievePaymentProductFields/:paymentProductId', function (req, res) {
  connectSdk.products.get(merchantId, req.params.paymentProductId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/products/retrievePaymentProductFieldDirectory/:paymentProductId', function (req, res) {
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];
  connectSdk.products.directory(merchantId, req.params.paymentProductId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// product groups
app.get('/products/retrievePaymentProductGroups', function (req, res) {
  connectSdk.productgroups.find(merchantId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/products/retrievePaymentProductGroup/:paymentProductGroupId', function (req, res) {
  connectSdk.productgroups.get(merchantId, req.params.paymentProductGroupId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// refunds
app.get('/refunds/retrieveRefund/:refundId', function (req, res) {
  connectSdk.refunds.get(merchantId, req.params.refundId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/refunds/approveRefund/:payoutId', function (req, res) {
  connectSdk.refunds.approve(merchantId, req.params.refundId, approveRefundStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/refunds/undoApproveRefund/:payoutId', function (req, res) {
  connectSdk.refunds.cancelapproval(merchantId, req.params.refundId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/refunds/cancelRefund/:payoutId', function (req, res) {
  connectSdk.refunds.cancel(merchantId, req.params.refundId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// riskassessments
app.get('/riskassessments/card', function (req, res) {
  connectSdk.riskassessments.cards(merchantId, riskAssessmentCardStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/riskassessments/bankaccount', function (req, res) {
  connectSdk.riskassessments.bankaccounts(merchantId, riskAssessmentBankAccountStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// services
app.get('/services/testconnection', function (req, res) {
  connectSdk.services.testconnection(merchantId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/services/retrieveIINdetails', function (req, res) {
  connectSdk.services.getIINdetails(merchantId, retrieveIINdetailsStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/services/convertbankaccount', function (req, res) {
  connectSdk.services.bankaccount(merchantId, convertBankAccountStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/services/convertAmount', function (req, res) {
  connectSdk.services.convertAmount(merchantId, {
    "source": "USD",
    "target": "EUR",
    "amount": 1000
  }, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// sessions
app.get('/sessions/createSession', function (req, res) {
  connectSdk.sessions.create(merchantId, createSessionStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// tokens
app.get('/tokens/createToken', function (req, res) {
  connectSdk.tokens.create(merchantId, createTokenStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/tokens/retrieveToken/:tokenId', function (req, res) {
  connectSdk.tokens.get(merchantId, req.params.tokenId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/tokens/updateToken/:tokenId', function (req, res) {
  connectSdk.tokens.update(merchantId, req.params.tokenId, updateTokenStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/tokens/deleteToken/:tokenId', function (req, res) {
  connectSdk.tokens.remove(merchantId, req.params.tokenId, { mandateCancelDate: "20160503" }, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/tokens/approveSepaDirectdebit/:tokenId', function (req, res) {
  connectSdk.tokens.approvesepadirectdebit(merchantId, req.params.tokenId, approvesepadirectdebitStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// init express
app.listen(port, function () {
  logger.info('server running at http://localhost:' + port);
});